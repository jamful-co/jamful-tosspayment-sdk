import type { PaymentMethod } from '../models/PaymentMethod';
import type { PaymentsWebView } from '../webview/PaymentsWebView';
export declare class PaymentMethodWidgetControl implements PaymentMethodWidgetControl {
    ref?: React.RefObject<PaymentsWebView>;
    constructor(ref?: React.RefObject<PaymentsWebView>);
    updateAmount(amount: number): Promise<void>;
    getSelectedPaymentMethod(): Promise<PaymentMethod>;
}
//# sourceMappingURL=PaymentMethodWidgetControl.d.ts.map