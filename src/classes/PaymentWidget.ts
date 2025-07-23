import type { RefObject } from 'react';
import type { Amount } from '../models/Amount';
import type {
  PaymentWidgetOptions,
  RuntimeEnvironment,
} from '../models/PaymentWidgetOptions';
import type { Result } from '../models/Result';
import type { PaymentInfo } from '../models/PaymentInfo';
import type { PaymentMethodWebView } from '../webview/PaymentMethodWebView';
import type { AgreementWebView } from '../webview/AgreementWebView';

interface InternalPaymentWidgetOptions extends PaymentWidgetOptions {
  environment: RuntimeEnvironment;
  service: string;
}

export class PaymentWidget {
  amount?: Amount;
  clientKey: string;
  customerKey: string;
  options: InternalPaymentWidgetOptions;
  constructor(
    clientKey: string,
    customerKey: string,
    options: InternalPaymentWidgetOptions
  ) {
    this.clientKey = clientKey;
    this.customerKey = customerKey;
    this.options = options;
  }

  equals(paymentWidget: PaymentWidget | null): boolean {
    if (paymentWidget == null) {
      return false;
    }

    return (
      paymentWidget.clientKey === this.clientKey &&
      paymentWidget.customerKey === this.customerKey &&
      JSON.stringify(paymentWidget.options) === JSON.stringify(this.options)
    );
  }

  async renderPaymentMethods(
    ref: RefObject<PaymentMethodWebView>,
    selector: string,
    amount: Amount,
    options?: { variantKey?: string }
  ) {
    this.amount = amount;
    const methodWidgetRef = ref.current!;
    const widgetOptions = (this.options ?? {}) as any;

    const widgetScript = `
    const widget = PaymentWidget(
      '${this.clientKey}',
      '${this.customerKey}',
      ${JSON.stringify(widgetOptions)}
    );
    `;
    return methodWidgetRef?.renderPaymentMethods(
      ref,
      widgetScript,
      selector,
      amount,
      options
    );
  }

  async renderAgeements(
    ref: RefObject<AgreementWebView>,
    selector: string,
    options?: { variantKey?: string }
  ) {
    const agreementWidgetRef = ref?.current!;
    const widgetOptions = (this.options ?? {}) as any;

    const widgetScript = `
    const widget = PaymentWidget(
      '${this.clientKey}',
      '${this.customerKey}',
      ${JSON.stringify(widgetOptions)}
    );
    `;

    return agreementWidgetRef?.renderAgreement(
      ref,
      widgetScript,
      selector,
      options
    );
  }

  async requestPayments(
    ref: RefObject<PaymentMethodWebView>,
    info: PaymentInfo
  ): Promise<Result> {
    const mainWidgetRef = ref?.current;

    if (mainWidgetRef == null) {
      return Promise.reject('mainWidget is undefined');
    }

    const anyInfo = info as any;
    anyInfo.successUrl = 'tosspayments://success';
    anyInfo.failUrl = 'tosspayments://fail';
    anyInfo.amount = this.amount;
    return mainWidgetRef.requestPayments(anyInfo);
  }
}
