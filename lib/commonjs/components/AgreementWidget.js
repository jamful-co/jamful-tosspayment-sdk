"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgreementWidget = AgreementWidget;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _html = require("../documents/html");
var _usePaymentWidget = require("../hooks/usePaymentWidget");
var _useWidgetRegistry = require("../hooks/useWidgetRegistry");
var _AgreementWebView = require("../webview/AgreementWebView");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function AgreementWidget({
  selector,
  onChange,
  onLoadEnd
}) {
  var _context$options;
  const [height, setHeight] = (0, _react.useState)(400);
  const webview = (0, _react.useRef)(null);
  const context = (0, _usePaymentWidget.usePaymentWidgetContext)();
  const {
    register,
    unregister,
    mainWidget
  } = (0, _useWidgetRegistry.useWidgetRegistry)();
  (0, _react.useEffect)(() => {
    register(selector, webview);
    return () => {
      unregister(selector);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height,
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_AgreementWebView.AgreementWebView, {
    androidLayerType: 'none',
    webviewDebuggingEnabled: true,
    ref: webview,
    source: {
      html: (0, _html.htmlString)({
        stage: 'v1',
        selector
      }),
      baseUrl: ((_context$options = context.options) === null || _context$options === void 0 || (_context$options = _context$options.brandpay) === null || _context$options === void 0 ? void 0 : _context$options.redirectUrl) ?? 'https://tosspayments.com'
    },
    injectedJavaScript: _html.defaultInjectedJavascript,
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