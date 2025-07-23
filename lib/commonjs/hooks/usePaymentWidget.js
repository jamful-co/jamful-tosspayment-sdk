"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentWidgetProvider = PaymentWidgetProvider;
exports.usePaymentWidget = usePaymentWidget;
exports.usePaymentWidgetContext = usePaymentWidgetContext;
var _react = _interopRequireWildcard(require("react"));
var _PaymentWidget = require("../classes/PaymentWidget");
var _useWidgetRegistry = require("./useWidgetRegistry");
var _useRuntimeEnvironment = require("./useRuntimeEnvironment");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
let paymentWidgetInstance = null;
const Context = /*#__PURE__*/(0, _react.createContext)(null);
function usePaymentWidgetContext() {
  const context = (0, _react.useContext)(Context);
  if (context == null) {
    throw new Error('PaymentWidgetProvider is not Initialized');
  }
  return context;
}
function PaymentWidgetProvider({
  children,
  clientKey,
  customerKey,
  options
}) {
  return /*#__PURE__*/_react.default.createElement(Context.Provider, {
    value: {
      clientKey,
      customerKey,
      options
    }
  }, children);
}
function usePaymentWidget() {
  const context = usePaymentWidgetContext();
  if (context == null) {
    throw new Error('PaymentWidgetProvider is not Initialized');
  }
  const {
    getWidget,
    setActive,
    mainWidget,
    setMainWidget
  } = (0, _useWidgetRegistry.useWidgetRegistry)();
  const {
    runtimeEnvironment
  } = (0, _useRuntimeEnvironment.useRuntimeEnvironment)();
  const newPaymentWidget = new _PaymentWidget.PaymentWidget(context.clientKey, context.customerKey, {
    ...context.options,
    environment: runtimeEnvironment,
    service: 'payment-widget-react-native'
  });
  if (newPaymentWidget.equals(paymentWidgetInstance) === false) {
    paymentWidgetInstance = newPaymentWidget;
  }
  return {
    renderPaymentMethods: async (selector, amount, options) => {
      var _getWidget;
      setActive(selector);
      const widget = (_getWidget = getWidget(selector)) === null || _getWidget === void 0 ? void 0 : _getWidget.ref;
      setMainWidget(widget);
      //TODO: widget도 줘야하고 selector도 줘야해서 더럽지만.. 내부 함수니까 오케이;;
      return await paymentWidgetInstance.renderPaymentMethods(widget, selector, amount, options);
    },
    renderAgreement: async (selector, options) => {
      var _getWidget2;
      setActive(selector);

      //TODO: widget도 줘야하고 selector도 줘야해서 더럽지만.. 내부 함수니까 오케이;;
      return await paymentWidgetInstance.renderAgeements((_getWidget2 = getWidget(selector)) === null || _getWidget2 === void 0 ? void 0 : _getWidget2.ref, selector, options);
    },
    requestPayment: async info => {
      return await paymentWidgetInstance.requestPayments(mainWidget, info);
    }
  };
}
//# sourceMappingURL=usePaymentWidget.js.map