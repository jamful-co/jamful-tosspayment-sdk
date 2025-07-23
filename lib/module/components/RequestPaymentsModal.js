import { Alert, Modal, SafeAreaView } from 'react-native';
import { URL } from 'react-native-url-polyfill';
import WebView from 'react-native-webview';
import { usePaymentWidgetContext } from '../hooks/usePaymentWidget';
import { ConvertUrl } from '../utils/convertUrl';
const SuccessUrlScheme = `tosspayments://success`;
const FailUrlScheme = `tosspayments://fail`;
export function RequestPaymentsModal({
  requestPaymentHTML,
  isVisible,
  onEvaluateJavascript,
  onSuccess,
  onFail
}) {
  var _context$options;
  const context = usePaymentWidgetContext();
  if (requestPaymentHTML == null) {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }
  return /*#__PURE__*/React.createElement(Modal, {
    animationType: 'slide',
    presentationStyle: 'pageSheet',
    onRequestClose: () => onFail({
      code: 'USER_CANCEL',
      message: '사용자가 결제를 취소하였습니다.',
      orderId: 'unknown'
    }),
    visible: isVisible
  }, /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(WebView, {
    androidLayerType: 'none',
    source: {
      html: requestPaymentHTML,
      baseUrl: ((_context$options = context.options) === null || _context$options === void 0 || (_context$options = _context$options.brandpay) === null || _context$options === void 0 ? void 0 : _context$options.redirectUrl) ?? 'https://tosspayments.com'
    },
    style: {
      // NOTE(JooYang): hardwareAccelerated 크래시 해결
      opacity: 0.99
    },
    webviewDebuggingEnabled: true,
    originWhitelist: ['*'],
    injectedJavaScript: `
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
        `,
    onMessage: event => {
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
              orderId: jsonObject.params.orderId
            });
            break;
          default:
            Alert.alert(`RequestPaymentsModal에 ${jsonObject.name} 을 구현해주세요`);
        }
      }
    },
    onError: error => {
      onFail({
        code: `${error.nativeEvent.code}`,
        message: error.nativeEvent.description,
        orderId: 'unknown'
      });
    },
    onHttpError: error => {
      onFail({
        code: `${error.nativeEvent.statusCode}`,
        message: error.nativeEvent.description,
        orderId: 'unknown'
      });
    },
    onShouldStartLoadWithRequest: request => {
      if (request.url.includes(SuccessUrlScheme)) {
        const success = {};
        success.additionalParameters = {};
        const url = new URL(request.url);
        const inputArray = url.search.replace('?', '').split('&');
        inputArray.forEach(item => {
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
                success.paymentType = value;
                break;
              default:
                success.additionalParameters[key] = value;
                break;
            }
          }
        });
        onSuccess(success);
        return false;
      }
      if (request.url.includes(FailUrlScheme)) {
        const fail = {};
        const url = new URL(request.url);
        const inputArray = url.search.replace('?', '').split('&');
        inputArray.forEach(item => {
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
      if (request.url.startsWith('http') || request.url.startsWith('about')) {
        return true;
      }
      const reEncodedUrl = reEncode(request.url);
      const convertUrl = new ConvertUrl(reEncodedUrl);
      convertUrl.launchApp().then(isLaunch => {
        if (isLaunch === false) {
          Alert.alert('앱 실행에 실패하였습니다.');
        }
      });
      return false;
    }
  })));
}

// V3 에서 path 에 JSON string 을 넣은 케이스가 있는데,
// colon 이 들어가 있어서 많은 URL 라이브러리가 터진다. 이를 다시 encode 해준다.
function reEncode(url) {
  const reEncodedString = url.replace(/%7B.*%7D/, match => {
    const decodedSubstring = decodeURIComponent(match);
    return encodeURIComponent(decodedSubstring);
  });
  return reEncodedString;
}
//# sourceMappingURL=RequestPaymentsModal.js.map