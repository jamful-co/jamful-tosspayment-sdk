import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { defaultInjectedJavascript, htmlString } from '../documents/html';
import { usePaymentWidgetContext } from '../hooks/usePaymentWidget';
import { useWidgetRegistry } from '../hooks/useWidgetRegistry';
import { PaymentMethodWebView } from '../webview/PaymentMethodWebView';
import { RequestPaymentsModal } from './RequestPaymentsModal';
export function PaymentMethodWidget({
  selector,
  onCustomRequest,
  onCustomPaymentMethodSelect,
  onCustomPaymentMethodUnselect,
  onLoadEnd
}) {
  var _context$options;
  const [height, setHeight] = useState(400);
  const webview = useRef(null);
  const context = usePaymentWidgetContext();
  const {
    register,
    unregister
  } = useWidgetRegistry();
  const [isModalVisible, setModalVisible] = useState(false);
  const [requestPaymentHTML, setRequestPaymentHTML] = useState(null);
  const [scriptForOnCancel, setScriptForOnCancel] = useState(null);
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
  }, /*#__PURE__*/React.createElement(RequestPaymentsModal, {
    requestPaymentHTML: requestPaymentHTML,
    isVisible: isModalVisible,
    onEvaluateJavascript: script => {
      var _webview$current;
      (_webview$current = webview.current) === null || _webview$current === void 0 || _webview$current.injectJavaScript(script);
      setModalVisible(false);
    },
    onSuccess: success => {
      var _webview$current2, _webview$current2$pay;
      (_webview$current2 = webview.current) === null || _webview$current2 === void 0 || (_webview$current2$pay = _webview$current2.paymentSuccess) === null || _webview$current2$pay === void 0 || _webview$current2$pay.call(_webview$current2, success);
      setModalVisible(false);
    },
    onFail: fail => {
      var _webview$current3, _webview$current3$pay;
      (_webview$current3 = webview.current) === null || _webview$current3 === void 0 || (_webview$current3$pay = _webview$current3.paymentFail) === null || _webview$current3$pay === void 0 || _webview$current3$pay.call(_webview$current3, fail);
      if (scriptForOnCancel != null) {
        var _webview$current4;
        (_webview$current4 = webview.current) === null || _webview$current4 === void 0 || _webview$current4.injectJavaScript(scriptForOnCancel);
      }
      setModalVisible(false);
    }
  }), /*#__PURE__*/React.createElement(PaymentMethodWebView, {
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
      var _webview$current6, _webview$current6$ren, _webview$current7, _webview$current7$pay, _webview$current8;
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
            if (params.status === 'load' && params.widget === 'paymentMethods') {
              var _webview$current5, _webview$current5$ren;
              webview === null || webview === void 0 || (_webview$current5 = webview.current) === null || _webview$current5 === void 0 || (_webview$current5$ren = _webview$current5.renderSuccess) === null || _webview$current5$ren === void 0 || _webview$current5$ren.call(_webview$current5);
            }
            break;
          case 'error':
            // FIXME : 논의 필요
            webview === null || webview === void 0 || (_webview$current6 = webview.current) === null || _webview$current6 === void 0 || (_webview$current6$ren = _webview$current6.renderFail) === null || _webview$current6$ren === void 0 || _webview$current6$ren.call(_webview$current6, {
              code: jsonObject.params.errorCode,
              message: jsonObject.params.errorMessage,
              orderId: 'unknown'
            });
            webview === null || webview === void 0 || (_webview$current7 = webview.current) === null || _webview$current7 === void 0 || (_webview$current7$pay = _webview$current7.paymentFail) === null || _webview$current7$pay === void 0 || _webview$current7$pay.call(_webview$current7, {
              code: jsonObject.params.errorCode,
              message: jsonObject.params.errorMessage,
              orderId: 'unknown'
            });
            break;
          case 'customRequest':
            onCustomRequest === null || onCustomRequest === void 0 || onCustomRequest({
              paymentMethodKey: jsonObject.params.paymentMethodKey
            });
            break;
          case 'customPaymentMethodSelect':
            onCustomPaymentMethodSelect === null || onCustomPaymentMethodSelect === void 0 || onCustomPaymentMethodSelect({
              paymentMethodKey: jsonObject.params.paymentMethodKey
            });
            break;
          case 'customPaymentMethodUnselect':
            onCustomPaymentMethodUnselect === null || onCustomPaymentMethodUnselect === void 0 || onCustomPaymentMethodUnselect({
              paymentMethodKey: jsonObject.params.paymentMethodKey
            });
            break;
          default:
            (_webview$current8 = webview.current) === null || _webview$current8 === void 0 || _webview$current8.onMessage(event);
            break;
        }
      }
    },
    containerStyle: {
      height
    }
  }));
}
//# sourceMappingURL=PaymentMethodWidget.js.map