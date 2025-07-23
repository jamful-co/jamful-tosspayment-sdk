import type { RefObject } from 'react';
import { PaymentMethodWidgetControl } from '../classes/PaymentMethodWidgetControl';
import type { Amount } from '../models/Amount';
import { PaymentsWebView } from './PaymentsWebView';
import type { Fail, Result, Success } from '../models/Result';
export declare class PaymentMethodWebView extends PaymentsWebView {
    paymentSuccess?: (success: Success) => void;
    paymentFail?: (success: Fail) => void;
    renderPaymentMethods(ref: RefObject<PaymentMethodWebView>, script: String, selector: String, amount: Amount, options?: {
        variantKey?: String;
    }): Promise<PaymentMethodWidgetControl>;
    requestPayments(info: any): Promise<Result>;
}
//# sourceMappingURL=PaymentMethodWebView.d.ts.map