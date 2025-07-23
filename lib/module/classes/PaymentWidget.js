export class PaymentWidget {
  constructor(clientKey, customerKey, options) {
    this.clientKey = clientKey;
    this.customerKey = customerKey;
    this.options = options;
  }
  equals(paymentWidget) {
    if (paymentWidget == null) {
      return false;
    }
    return paymentWidget.clientKey === this.clientKey && paymentWidget.customerKey === this.customerKey && JSON.stringify(paymentWidget.options) === JSON.stringify(this.options);
  }
  async renderPaymentMethods(ref, selector, amount, options) {
    this.amount = amount;
    const methodWidgetRef = ref.current;
    const widgetOptions = this.options ?? {};
    const widgetScript = `
    const widget = PaymentWidget(
      '${this.clientKey}',
      '${this.customerKey}',
      ${JSON.stringify(widgetOptions)}
    );
    `;
    return methodWidgetRef === null || methodWidgetRef === void 0 ? void 0 : methodWidgetRef.renderPaymentMethods(ref, widgetScript, selector, amount, options);
  }
  async renderAgeements(ref, selector, options) {
    const agreementWidgetRef = ref === null || ref === void 0 ? void 0 : ref.current;
    const widgetOptions = this.options ?? {};
    const widgetScript = `
    const widget = PaymentWidget(
      '${this.clientKey}',
      '${this.customerKey}',
      ${JSON.stringify(widgetOptions)}
    );
    `;
    return agreementWidgetRef === null || agreementWidgetRef === void 0 ? void 0 : agreementWidgetRef.renderAgreement(ref, widgetScript, selector, options);
  }
  async requestPayments(ref, info) {
    const mainWidgetRef = ref === null || ref === void 0 ? void 0 : ref.current;
    if (mainWidgetRef == null) {
      return Promise.reject('mainWidget is undefined');
    }
    const anyInfo = info;
    anyInfo.successUrl = 'tosspayments://success';
    anyInfo.failUrl = 'tosspayments://fail';
    anyInfo.amount = this.amount;
    return mainWidgetRef.requestPayments(anyInfo);
  }
}
//# sourceMappingURL=PaymentWidget.js.map