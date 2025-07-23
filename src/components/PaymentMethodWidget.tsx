import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { defaultInjectedJavascript, htmlString } from '../documents/html';
import { usePaymentWidgetContext } from '../hooks/usePaymentWidget';
import { useWidgetRegistry } from '../hooks/useWidgetRegistry';
import { PaymentMethodWebView } from '../webview/PaymentMethodWebView';
import { RequestPaymentsModal } from './RequestPaymentsModal';

interface Props {
  selector: string;
  onCustomRequest?: ({
    paymentMethodKey,
  }: {
    paymentMethodKey: string;
  }) => void;
  onCustomPaymentMethodSelect?: ({
    paymentMethodKey,
  }: {
    paymentMethodKey: string;
  }) => void;
  onCustomPaymentMethodUnselect?: ({
    paymentMethodKey,
  }: {
    paymentMethodKey: string;
  }) => void;
  onLoadEnd: () => void;
}

export function PaymentMethodWidget({
  selector,
  onCustomRequest,
  onCustomPaymentMethodSelect,
  onCustomPaymentMethodUnselect,
  onLoadEnd,
}: Props) {
  const [height, setHeight] = useState(400);
  const webview = useRef<PaymentMethodWebView>(null);
  const context = usePaymentWidgetContext();
  const { register, unregister } = useWidgetRegistry();
  const [isModalVisible, setModalVisible] = useState(false);
  const [requestPaymentHTML, setRequestPaymentHTML] = useState(null);
  const [scriptForOnCancel, setScriptForOnCancel] = useState<null | string>(
    null
  );

  useEffect(() => {
    register(selector, webview);

    return () => {
      unregister(selector);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ height, width: '100%' }}>
      <RequestPaymentsModal
        requestPaymentHTML={requestPaymentHTML}
        isVisible={isModalVisible}
        onEvaluateJavascript={(script) => {
          webview.current?.injectJavaScript(script);
          setModalVisible(false);
        }}
        onSuccess={(success) => {
          webview.current?.paymentSuccess?.(success);
          setModalVisible(false);
        }}
        onFail={(fail) => {
          webview.current?.paymentFail?.(fail);
          if (scriptForOnCancel != null) {
            webview.current?.injectJavaScript(scriptForOnCancel);
          }
          setModalVisible(false);
        }}
      />
      <PaymentMethodWebView
        androidLayerType={'none'}
        webviewDebuggingEnabled={true}
        ref={webview}
        source={{
          html: htmlString({ stage: 'v1', selector }),
          baseUrl:
            context.options?.brandpay?.redirectUrl ??
            'https://tosspayments.com',
        }}
        injectedJavaScript={defaultInjectedJavascript}
        onLoadEnd={onLoadEnd}
        onMessage={(event) => {
          if (event.nativeEvent.data !== undefined) {
            const jsonObject = JSON.parse(event.nativeEvent.data);
            switch (jsonObject.name) {
              case 'updateHeight':
                setHeight(jsonObject.params.height);
                break;
              case 'requestPayments':
              case 'requestHTML':
                setRequestPaymentHTML(jsonObject.params.html);
                setScriptForOnCancel(jsonObject.params.scriptForOnCancel);
                setModalVisible(true);
                break;
              case 'widgetStatus':
                const params = jsonObject.params;
                if (
                  params.status === 'load' &&
                  params.widget === 'paymentMethods'
                ) {
                  webview?.current?.renderSuccess?.();
                }
                break;
              case 'error':
                // FIXME : 논의 필요
                webview?.current?.renderFail?.({
                  code: jsonObject.params.errorCode,
                  message: jsonObject.params.errorMessage,
                  orderId: 'unknown',
                });
                webview?.current?.paymentFail?.({
                  code: jsonObject.params.errorCode,
                  message: jsonObject.params.errorMessage,
                  orderId: 'unknown',
                });
                break;
              case 'customRequest':
                onCustomRequest?.({
                  paymentMethodKey: jsonObject.params.paymentMethodKey,
                });
                break;
              case 'customPaymentMethodSelect':
                onCustomPaymentMethodSelect?.({
                  paymentMethodKey: jsonObject.params.paymentMethodKey,
                });
                break;
              case 'customPaymentMethodUnselect':
                onCustomPaymentMethodUnselect?.({
                  paymentMethodKey: jsonObject.params.paymentMethodKey,
                });
                break;
              default:
                webview.current?.onMessage(event);
                break;
            }
          }
        }}
        containerStyle={{ height }}
      />
    </View>
  );
}
