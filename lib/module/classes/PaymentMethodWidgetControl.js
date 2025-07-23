import { generateRandomUUID } from '../utils/generateRandomUUID';
export class PaymentMethodWidgetControl {
  constructor(ref) {
    this.ref = ref;
  }
  async updateAmount(amount) {
    return new Promise(resolve => {
      var _this$ref;
      (_this$ref = this.ref) === null || _this$ref === void 0 || (_this$ref = _this$ref.current) === null || _this$ref === void 0 || _this$ref.injectJavaScript(`
      paymentMethodWidget.updateAmount(${JSON.stringify(amount)});
      true;
    `);
      resolve();
    });
  }
  async getSelectedPaymentMethod() {
    return new Promise(async (resolve, reject) => {
      var _this$ref2;
      const sessionKey = generateRandomUUID();
      const paymentMethod = await ((_this$ref2 = this.ref) === null || _this$ref2 === void 0 || (_this$ref2 = _this$ref2.current) === null || _this$ref2 === void 0 ? void 0 : _this$ref2.asyncEvaluateJavascript(`
        window.ReactNativeWebView.postMessage(JSON.stringify({
          name: 'resolve',
          params: {
            key: '${sessionKey}',
            data: paymentMethodWidget.getSelectedPaymentMethod()
          }
        }));
        true;
    `, sessionKey));
      if (paymentMethod === undefined) {
        reject('paymentMethod is undefined');
      } else {
        console.log(paymentMethod);
        resolve(JSON.parse(paymentMethod));
      }
    });
  }
}
//# sourceMappingURL=PaymentMethodWidgetControl.js.map