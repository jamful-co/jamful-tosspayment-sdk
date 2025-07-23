import type { RefObject } from 'react';
import { PaymentsWebView } from './PaymentsWebView';
import { AgreementWidgetControl } from '../classes/AgreementWidgetControl';

export class AgreementWebView extends PaymentsWebView {
  async renderAgreement(
    ref: RefObject<AgreementWebView>,
    widgetScript: String,
    selector: String,
    options?: { variantKey?: String }
  ): Promise<AgreementWidgetControl> {
    const renderScript = `${
      options?.variantKey !== undefined
        ? `const agreementWidget = widget.renderAgreement('#${selector}', ${JSON.stringify(
            options
          )});`
        : `const agreementWidget = widget.renderAgreement('#${selector}');`
    }`;

    return new Promise((resolve, error) => {
      this.renderSuccess = () => {
        resolve(new AgreementWidgetControl(ref));
      };
      this.renderFail = (fail) => {
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
