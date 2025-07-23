import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { defaultInjectedJavascript, htmlString } from '../documents/html';
import { usePaymentWidgetContext } from '../hooks/usePaymentWidget';
import { useWidgetRegistry } from '../hooks/useWidgetRegistry';
import { AgreementWebView } from '../webview/AgreementWebView';
export function AgreementWidget({
  selector,
  onChange,
  onLoadEnd
}) {
  var _context$options;
  const [height, setHeight] = useState(400);
  const webview = useRef(null);
  const context = usePaymentWidgetContext();
  const {
    register,
    unregister,
    mainWidget
  } = useWidgetRegistry();
  useEffect(() => {
    register(selector, webview);
    return () => {
      unregister(selector);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: {
      height,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(AgreementWebView, {
    androidLayerType: 'none',
    webviewDebuggingEnabled: true,
    ref: webview,
    source: {
      html: htmlString({
        stage: 'v1',
        selector
      }),
      baseUrl: ((_context$options = context.options) === null || _context$options === void 0 || (_context$options = _context$options.brandpay) === null || _context$options === void 0 ? void 0 : _context$options.redirectUrl) ?? 'https://tosspayments.com'
    },
    injectedJavaScript: defaultInjectedJavascript,
    onLoadEnd: onLoadEnd,
    onMessage: event => {
      var _mainWidget$current, _mainWidget$current$r, _webview$current2;
      const jsonObject = JSON.parse(event.nativeEvent.data);
      switch (jsonObject.name) {
        case 'updateHeight':
          setHeight(jsonObject.params.height);
          break;
        case 'updateAgreementStatus':
          const agreementStatus = jsonObject.params;
          onChange === null || onChange === void 0 || onChange(agreementStatus);
          break;
        case 'widgetStatus':
          const params = jsonObject.params;
          if (params.status === 'load' && params.widget === 'agreement') {
            var _webview$current, _webview$current$rend;
            webview === null || webview === void 0 || (_webview$current = webview.current) === null || _webview$current === void 0 || (_webview$current$rend = _webview$current.renderSuccess) === null || _webview$current$rend === void 0 || _webview$current$rend.call(_webview$current);
          }
          break;
        case 'error':
          mainWidget === null || mainWidget === void 0 || (_mainWidget$current = mainWidget.current) === null || _mainWidget$current === void 0 || (_mainWidget$current$r = _mainWidget$current.renderFail) === null || _mainWidget$current$r === void 0 || _mainWidget$current$r.call(_mainWidget$current, {
            code: jsonObject.params.errorCode,
            message: jsonObject.params.errorMessage,
            orderId: 'unknown'
          });
          break;
        default:
          (_webview$current2 = webview.current) === null || _webview$current2 === void 0 || _webview$current2.onMessage(event);
          break;
      }
    },
    containerStyle: {
      height
    }
  }));
}
//# sourceMappingURL=AgreementWidget.js.map