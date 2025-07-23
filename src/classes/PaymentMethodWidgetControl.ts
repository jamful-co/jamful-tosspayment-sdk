import type { PaymentMethod } from '../models/PaymentMethod';
import { generateRandomUUID } from '../utils/generateRandomUUID';
import type { PaymentsWebView } from '../webview/PaymentsWebView';

export class PaymentMethodWidgetControl implements PaymentMethodWidgetControl {
  ref?: React.RefObject<PaymentsWebView>;
  constructor(ref?: React.RefObject<PaymentsWebView>) {
    this.ref = ref;
  }

  async updateAmount(amount: number) {
    return new Promise<void>((resolve) => {
      this.ref?.current?.injectJavaScript(`
      paymentMethodWidget.updateAmount(${JSON.stringify(amount)});
      true;
    `);
      resolve();
    });
  }

  async getSelectedPaymentMethod(): Promise<PaymentMethod> {
    return new Promise<PaymentMethod>(async (resolve, reject) => {
      const sessionKey = generateRandomUUID();
      const paymentMethod = await this.ref?.current?.asyncEvaluateJavascript(
        `
        window.ReactNativeWebView.postMessage(JSON.stringify({
          name: 'resolve',
          params: {
            key: '${sessionKey}',
            data: paymentMethodWidget.getSelectedPaymentMethod()
          }
        }));
        true;
    `,
        sessionKey
      );
      if (paymentMethod === undefined) {
        reject('paymentMethod is undefined');
      } else {
        console.log(paymentMethod);
        resolve(JSON.parse(paymentMethod) as PaymentMethod);
      }
    });
  }
}
