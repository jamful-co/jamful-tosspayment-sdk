"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgreementWebView = void 0;
var _PaymentsWebView = require("./PaymentsWebView");
var _AgreementWidgetControl = require("../classes/AgreementWidgetControl");
class AgreementWebView extends _PaymentsWebView.PaymentsWebView {
  async renderAgreement(ref, widgetScript, selector, options) {
    const renderScript = `${(options === null || options === void 0 ? void 0 : options.variantKey) !== undefined ? `const agreementWidget = widget.renderAgreement('#${selector}', ${JSON.stringify(options)});` : `const agreementWidget = widget.renderAgreement('#${selector}');`}`;
    return new Promise((resolve, error) => {
      this.renderSuccess = () => {
        resolve(new _AgreementWidgetControl.AgreementWidgetControl(ref));
      };
      this.renderFail = fail => {
        error(fail);
      };
      this.injectJavaScript(`
      ${widgetScript}
      ${renderScript}
      true;
      `);
    });
  }
}
exports.AgreementWebView = AgreementWebView;
//# sourceMappingURL=AgreementWebView.js.map