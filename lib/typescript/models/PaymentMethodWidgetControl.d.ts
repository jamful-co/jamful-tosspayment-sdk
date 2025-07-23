import type { PaymentMethod } from './PaymentMethod';
export interface PaymentMethodWidgetControl {
    updateAmount: (amount: number) => Promise<void>;
    getSelectedPaymentMethod: () => Promise<PaymentMethod>;
}
//# sourceMappingURL=PaymentMethodWidgetControl.d.ts.map