import type { RefObject } from 'react';
import { PaymentMethodWidgetControl } from '../classes/PaymentMethodWidgetControl';
import type { Amount } from '../models/Amount';
import { PaymentsWebView } from './PaymentsWebView';
import type { Fail, Result, Success } from '../models/Result';

export class PaymentMethodWebView extends PaymentsWebView {
  paymentSuccess?: (success: Success) => void;
  paymentFail?: (success: Fail) => void;

  async renderPaymentMethods(
    ref: RefObject<PaymentMethodWebView>,
    script: String,
    selector: String,
    amount: Amount,
    options?: { variantKey?: String }
  ): Promise<PaymentMethodWidgetControl> {
    return new Promise((resolve, error) => {
      this.renderSuccess = () => {
        resolve(new PaymentMethodWidgetControl(ref));
      };
      this.renderFail = (fail) => {
        error(fail);
      };
      this.injectJavaScript(`
      ${script}
      const paymentMethodWidget = widget.renderPaymentMethods('#${selector}', ${JSON.stringify(
        amount
      )}, { variantKey: ${
        options?.variantKey !== undefined
          ? `'${options?.variantKey}'`
          : `undefined`
      } });
      true;
      `);
    });
  }

  //TODO: 좋은 형태는 아니지만 일단 편하게 처리;;
  async requestPayments(info: any): Promise<Result> {
    return new Promise((resolve) => {
      this.paymentSuccess = (success) => {
        resolve({ success });
      };
      this.paymentFail = (fail) => {
        resolve({ fail });
      };
      this.webRef.current?.injectJavaScript(`
      widget.requestPaymentForNativeSDK(${JSON.stringify(info)});
      true;
      `);
    });
  }
}
