import { PaymentsWebView } from './PaymentsWebView';
import { AgreementWidgetControl } from '../classes/AgreementWidgetControl';
export class AgreementWebView extends PaymentsWebView {
  async renderAgreement(ref, widgetScript, selector, options) {
    const renderScript = `${(options === null || options === void 0 ? void 0 : options.variantKey) !== undefined ? `const agreementWidget = widget.renderAgreement('#${selector}', ${JSON.stringify(options)});` : `const agreementWidget = widget.renderAgreement('#${selector}');`}`;
    return new Promise((resolve, error) => {
      this.renderSuccess = () => {
        resolve(new AgreementWidgetControl(ref));
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
//# sourceMappingURL=AgreementWebView.js.map