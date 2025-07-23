"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentMethodWebView = void 0;
var _PaymentMethodWidgetControl = require("../classes/PaymentMethodWidgetControl");
var _PaymentsWebView = require("./PaymentsWebView");
class PaymentMethodWebView extends _PaymentsWebView.PaymentsWebView {
  async renderPaymentMethods(ref, script, selector, amount, options) {
    return new Promise((resolve, error) => {
      this.renderSuccess = () => {
        resolve(new _PaymentMethodWidgetControl.PaymentMethodWidgetControl(ref));
      };
      this.renderFail = fail => {
        error(fail);
      };
      this.injectJavaScript(`
      ${script}
      const paymentMethodWidget = widget.renderPaymentMethods('#${selector}', ${JSON.stringify(amount)}, { variantKey: ${(options === null || options === void 0 ? void 0 : options.variantKey) !== undefined ? `'${options === null || options === void 0 ? void 0 : options.variantKey}'` : `undefined`} });
      true;
      `);
    });
  }

  //TODO: 좋은 형태는 아니지만 일단 편하게 처리;;
  async requestPayments(info) {
    return new Promise(resolve => {
      var _this$webRef$current;
      this.paymentSuccess = success => {
        resolve({
          success
        });
      };
      this.paymentFail = fail => {
        resolve({
          fail
        });
      };
      (_this$webRef$current = this.webRef.current) === null || _this$webRef$current === void 0 || _this$webRef$current.injectJavaScript(`
      widget.requestPaymentForNativeSDK(${JSON.stringify(info)});
      true;
      `);
    });
  }
}
exports.PaymentMethodWebView = PaymentMethodWebView;
//# sourceMappingURL=PaymentMethodWebView.js.map