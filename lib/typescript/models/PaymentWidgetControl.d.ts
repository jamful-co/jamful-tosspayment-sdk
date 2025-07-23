import type { AgreementWidgetControl } from './AgreementWidgetControl';
import type { Amount } from './Amount';
import type { PaymentMethodWidgetControl } from './PaymentMethodWidgetControl';
import type { RenderAgreementOptions } from './RenderAgreementOptions';
import type { RenderPaymentMethodsOptions } from './RenderPaymentMethodsOptions';
import type { PaymentInfo } from './PaymentInfo';
import type { Result } from './Result';
export interface PaymentWidgetControl {
    renderPaymentMethods: (selector: string, amount: Amount, options?: RenderPaymentMethodsOptions) => Promise<PaymentMethodWidgetControl>;
    renderAgreement: (selector: string, options?: RenderAgreementOptions) => Promise<AgreementWidgetControl>;
    requestPayment: (paymentInfo: PaymentInfo) => Promise<Result | undefined>;
}
//# sourceMappingURL=PaymentWidgetControl.d.ts.map