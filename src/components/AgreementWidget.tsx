import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { defaultInjectedJavascript, htmlString } from '../documents/html';
import { usePaymentWidgetContext } from '../hooks/usePaymentWidget';
import { useWidgetRegistry } from '../hooks/useWidgetRegistry';
import type { AgreementStatus } from '../models/AgreementStatus';
import { AgreementWebView } from '../webview/AgreementWebView';

interface Props {
  selector: string;
  onChange?: (agreementStatus: AgreementStatus) => void;
  onLoadEnd: () => void;
}

export function AgreementWidget({ selector, onChange, onLoadEnd }: Props) {
  const [height, setHeight] = useState(400);
  const webview = useRef<AgreementWebView>(null);
  const context = usePaymentWidgetContext();
  const { register, unregister, mainWidget } = useWidgetRegistry();
  useEffect(() => {
    register(selector, webview);

    return () => {
      unregister(selector);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ height, width: '100%' }}>
      <AgreementWebView
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
        onMessage={(event: { nativeEvent: { data: string } }) => {
          const jsonObject = JSON.parse(event.nativeEvent.data);
          switch (jsonObject.name) {
            case 'updateHeight':
              setHeight(jsonObject.params.height);
              break;
            case 'updateAgreementStatus':
              const agreementStatus = jsonObject.params;
              onChange?.(agreementStatus);
              break;
            case 'widgetStatus':
              const params = jsonObject.params;
              if (params.status === 'load' && params.widget === 'agreement') {
                webview?.current?.renderSuccess?.();
              }
              break;
            case 'error':
              mainWidget?.current?.renderFail?.({
                code: jsonObject.params.errorCode,
                message: jsonObject.params.errorMessage,
                orderId: 'unknown',
              });
              break;
            default:
              webview.current?.onMessage(event);
              break;
          }
        }}
        containerStyle={{ height }}
      />
    </View>
  );
}
