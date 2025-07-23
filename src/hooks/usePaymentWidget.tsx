import React, { createContext, useContext, type ReactNode } from 'react';
import { PaymentWidget } from '../classes/PaymentWidget';
import type { Amount } from '../models/Amount';
import { useWidgetRegistry } from './useWidgetRegistry';

import type { PaymentInfo } from '../models/PaymentInfo';
import type { PaymentWidgetControl } from '../models/PaymentWidgetControl';
import type { PaymentWidgetOptions } from '../models/PaymentWidgetOptions';
import { useRuntimeEnvironment } from './useRuntimeEnvironment';

let paymentWidgetInstance: PaymentWidget | null = null;

interface ContextValue {
  clientKey: string;
  customerKey: string;
  options?: PaymentWidgetOptions;
}

const Context = createContext<ContextValue | null>(null);

export function usePaymentWidgetContext() {
  const context = useContext(Context);
  if (context == null) {
    throw new Error('PaymentWidgetProvider is not Initialized');
  }

  return context;
}

interface Props {
  clientKey: string;
  customerKey: string;
  options?: PaymentWidgetOptions;
  children: ReactNode;
}

export function PaymentWidgetProvider({
  children,
  clientKey,
  customerKey,
  options,
}: Props) {
  return (
    <Context.Provider value={{ clientKey, customerKey, options }}>
      {children}
    </Context.Provider>
  );
}

export function usePaymentWidget(): PaymentWidgetControl {
  const context = usePaymentWidgetContext();
  if (context == null) {
    throw new Error('PaymentWidgetProvider is not Initialized');
  }

  const { getWidget, setActive, mainWidget, setMainWidget } =
    useWidgetRegistry();

  const { runtimeEnvironment } = useRuntimeEnvironment();

  const newPaymentWidget = new PaymentWidget(
    context.clientKey,
    context.customerKey,
    {
      ...context.options,
      environment: runtimeEnvironment,
      service: 'payment-widget-react-native',
    }
  );

  if (newPaymentWidget.equals(paymentWidgetInstance) === false) {
    paymentWidgetInstance = newPaymentWidget;
  }

  return {
    renderPaymentMethods: async (
      selector: string,
      amount: Amount,
      options?: { variantKey?: string }
    ) => {
      setActive(selector);
      const widget = getWidget(selector)?.ref as any;
      setMainWidget(widget);
      //TODO: widget도 줘야하고 selector도 줘야해서 더럽지만.. 내부 함수니까 오케이;;
      return await paymentWidgetInstance!.renderPaymentMethods(
        widget,
        selector,
        amount,
        options
      );
    },
    renderAgreement: async (
      selector: string,
      options?: { variantKey?: string }
    ) => {
      setActive(selector);

      //TODO: widget도 줘야하고 selector도 줘야해서 더럽지만.. 내부 함수니까 오케이;;
      return await paymentWidgetInstance!.renderAgeements(
        getWidget(selector)?.ref as any,
        selector,
        options
      );
    },
    requestPayment: async (info: PaymentInfo) => {
      return await paymentWidgetInstance!.requestPayments(
        mainWidget as any,
        info
      );
    },
  };
}
