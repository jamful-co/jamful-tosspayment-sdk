import React, { createContext, useContext } from 'react';
import { PaymentWidget } from '../classes/PaymentWidget';
import { useWidgetRegistry } from './useWidgetRegistry';
import { useRuntimeEnvironment } from './useRuntimeEnvironment';
let paymentWidgetInstance = null;
const Context = /*#__PURE__*/createContext(null);
export function usePaymentWidgetContext() {
  const context = useContext(Context);
  if (context == null) {
    throw new Error('PaymentWidgetProvider is not Initialized');
  }
  return context;
}
export function PaymentWidgetProvider({
  children,
  clientKey,
  customerKey,
  options
}) {
  return /*#__PURE__*/React.createElement(Context.Provider, {
    value: {
      clientKey,
      customerKey,
      options
    }
  }, children);
}
export function usePaymentWidget() {
  const context = usePaymentWidgetContext();
  if (context == null) {
    throw new Error('PaymentWidgetProvider is not Initialized');
  }
  const {
    getWidget,
    setActive,
    mainWidget,
    setMainWidget
  } = useWidgetRegistry();
  const {
    runtimeEnvironment
  } = useRuntimeEnvironment();
  const newPaymentWidget = new PaymentWidget(context.clientKey, context.customerKey, {
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