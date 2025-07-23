import type { RefObject } from 'react';
import type { Amount } from '../models/Amount';
import type { PaymentWidgetOptions, RuntimeEnvironment } from '../models/PaymentWidgetOptions';
import type { Result } from '../models/Result';
import type { PaymentInfo } from '../models/PaymentInfo';
import type { PaymentMethodWebView } from '../webview/PaymentMethodWebView';
import type { AgreementWebView } from '../webview/AgreementWebView';
interface InternalPaymentWidgetOptions extends PaymentWidgetOptions {
    environment: RuntimeEnvironment;
    service: string;
}
export declare class PaymentWidget {
    amount?: Amount;
    clientKey: string;
    customerKey: string;
    options: InternalPaymentWidgetOptions;
    constructor(clientKey: string, customerKey: string, options: InternalPaymentWidgetOptions);
    equals(paymentWidget: PaymentWidget | null): boolean;
    renderPaymentMethods(ref: RefObject<PaymentMethodWebView>, selector: string, amount: Amount, options?: {
        variantKey?: string;
    }): Promise<import("./PaymentMethodWidgetControl").PaymentMethodWidgetControl>;
    renderAgeements(ref: RefObject<AgreementWebView>, selector: string, options?: {
        variantKey?: string;
    }): Promise<import("./AgreementWidgetControl").AgreementWidgetControl>;
    requestPayments(ref: RefObject<PaymentMethodWebView>, info: PaymentInfo): Promise<Result>;
}
export {};
//# sourceMappingURL=PaymentWidget.d.ts.map