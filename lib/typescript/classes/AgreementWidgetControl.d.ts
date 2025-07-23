import type { AgreementStatus } from '../models/AgreementStatus';
import type { PaymentsWebView } from '../webview/PaymentsWebView';
export declare class AgreementWidgetControl implements AgreementWidgetControl {
    ref?: React.RefObject<PaymentsWebView>;
    constructor(ref?: React.RefObject<PaymentsWebView>);
    getAgreementStatus: () => Promise<AgreementStatus>;
}
//# sourceMappingURL=AgreementWidgetControl.d.ts.map