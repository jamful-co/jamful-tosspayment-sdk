import type { AgreementStatus } from '../models/AgreementStatus';
import { generateRandomUUID } from '../utils/generateRandomUUID';
import type { PaymentsWebView } from '../webview/PaymentsWebView';

export class AgreementWidgetControl implements AgreementWidgetControl {
  ref?: React.RefObject<PaymentsWebView>;
  constructor(ref?: React.RefObject<PaymentsWebView>) {
    this.ref = ref;
  }

  getAgreementStatus: () => Promise<AgreementStatus> = async () => {
    return new Promise<AgreementStatus>(async (resolve, reject) => {
      const sessionKey = generateRandomUUID();
      const status = await this.ref?.current?.asyncEvaluateJavascript(
        `
      window.ReactNativeWebView.postMessage(JSON.stringify({
        name: 'resolve',
        params: {
          key: '${sessionKey}',
          data: agreementWidget.getAgreementStatus()
        }
      }));
      true;
    `,
        sessionKey
      );
      if (status === undefined) {
        reject('status is undefined');
      } else {
        resolve(JSON.parse(status) as AgreementStatus);
      }
    });
  };
}
