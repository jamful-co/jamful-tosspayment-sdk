import { Alert, Modal, SafeAreaView } from 'react-native';
import { URL } from 'react-native-url-polyfill';
import WebView from 'react-native-webview';
import { usePaymentWidgetContext } from '../hooks/usePaymentWidget';
import type { PaymentType } from '../models/PaymentType';
import type { Fail, Success } from '../models/Result';
import { ConvertUrl } from '../utils/convertUrl';
interface Props {
  requestPaymentHTML: string | null;
  isVisible: boolean;
  onEvaluateJavascript: (script: string) => void;
  onSuccess: (success: Success) => void;
  onFail: (fail: Fail) => void;
}

const SuccessUrlScheme = `tosspayments://success`;
const FailUrlScheme = `tosspayments://fail`;

export function RequestPaymentsModal({
  requestPaymentHTML,
  isVisible,
  onEvaluateJavascript,
  onSuccess,
  onFail,
}: Props) {
  const context = usePaymentWidgetContext();

  if (requestPaymentHTML == null) {
    return <></>;
  }

  return (
    <Modal
      animationType={'slide'}
      presentationStyle={'pageSheet'}
      onRequestClose={() =>
        onFail({
          code: 'USER_CANCEL',
          message: '사용자가 결제를 취소하였습니다.',
          orderId: 'unknown',
        })
      }
      visible={isVisible}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          androidLayerType={'none'}
          source={{
            html: requestPaymentHTML,
            baseUrl:
              context.options?.brandpay?.redirectUrl ??
              'https://tosspayments.com',
          }}
          style={{
            // NOTE(JooYang): hardwareAccelerated 크래시 해결
            opacity: 0.99,
          }}
          webviewDebuggingEnabled={true}
          originWhitelist={['*']}
          injectedJavaScript={`
        window.PaymentWidgetReactNativeSDK = {
          message: {
            postMessage: function(message) {
              window.ReactNativeWebView.postMessage(message);
            }
          },
          error: {
            postMessage: function(error) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                name: 'error',
                params: error,
              }));
            }
          },
        };
        true;
        `}
          onMessage={(event) => {
            if (event.nativeEvent.data !== undefined) {
              const jsonObject = JSON.parse(event.nativeEvent.data);
              switch (jsonObject.name) {
                case 'evaluateJavascriptOnPaymentMethodWidget':
                  onEvaluateJavascript(jsonObject.params.script);
                  break;
                case 'error':
                  onFail({
                    code: jsonObject.params.errorCode,
                    message: jsonObject.params.errorMessage,
                    orderId: jsonObject.params.orderId,
                  });
                  break;
                default:
                  Alert.alert(
                    `RequestPaymentsModal에 ${jsonObject.name} 을 구현해주세요`
                  );
              }
            }
          }}
          onError={(error) => {
            onFail({
              code: `${error.nativeEvent.code}`,
              message: error.nativeEvent.description,
              orderId: 'unknown',
            });
          }}
          onHttpError={(error) => {
            onFail({
              code: `${error.nativeEvent.statusCode}`,
              message: error.nativeEvent.description,
              orderId: 'unknown',
            });
          }}
          onShouldStartLoadWithRequest={(request) => {
            if (request.url.includes(SuccessUrlScheme)) {
              const success: Success = {} as Success;
              success.additionalParameters = {} as Record<string, string>;
              const url = new URL(request.url);
              const inputArray = url.search.replace('?', '').split('&');
              inputArray.forEach((item) => {
                const [key, value] = item.split('=');
                if (key != null && value != null) {
                  switch (key) {
                    case 'paymentKey':
                      success.paymentKey = value;
                      break;
                    case 'amount':
                      success.amount = parseFloat(value);
                      break;
                    case 'orderId':
                      success.orderId = value;
                      break;
                    case 'paymentType':
                      success.paymentType = value as PaymentType;
                      break;
                    default:
                      success.additionalParameters![key] = value;
                      break;
                  }
                }
              });
              onSuccess(success);
              return false;
            }

            if (request.url.includes(FailUrlScheme)) {
              const fail: Fail = {} as Fail;
              const url = new URL(request.url);
              const inputArray = url.search.replace('?', '').split('&');
              inputArray.forEach((item) => {
                const [key, value] = item.split('=');
                if (value !== undefined) {
                  switch (key) {
                    case 'code':
                      fail.code = value;
                      break;
                    case 'message':
                      fail.message = decodeURIComponent(value);
                      break;
                    case 'orderId':
                      fail.orderId = value;
                      break;
                  }
                }
              });
              onFail(fail);
              return false;
            }

            if (
              request.url.startsWith('http') ||
              request.url.startsWith('about')
            ) {
              return true;
            }

            const reEncodedUrl = reEncode(request.url);
            const convertUrl = new ConvertUrl(reEncodedUrl);
            convertUrl.launchApp().then((isLaunch) => {
              if (isLaunch === false) {
                Alert.alert('앱 실행에 실패하였습니다.');
              }
            });

            return false;
          }}
        />
      </SafeAreaView>
    </Modal>
  );
}

// V3 에서 path 에 JSON string 을 넣은 케이스가 있는데,
// colon 이 들어가 있어서 많은 URL 라이브러리가 터진다. 이를 다시 encode 해준다.
function reEncode(url: string) {
  const reEncodedString = url.replace(/%7B.*%7D/, (match) => {
    const decodedSubstring = decodeURIComponent(match);
    return encodeURIComponent(decodedSubstring);
  });

  return reEncodedString;
}
