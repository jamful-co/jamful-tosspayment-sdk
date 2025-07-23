interface Props {
    selector: string;
    onCustomRequest?: ({ paymentMethodKey, }: {
        paymentMethodKey: string;
    }) => void;
    onCustomPaymentMethodSelect?: ({ paymentMethodKey, }: {
        paymentMethodKey: string;
    }) => void;
    onCustomPaymentMethodUnselect?: ({ paymentMethodKey, }: {
        paymentMethodKey: string;
    }) => void;
    onLoadEnd: () => void;
}
export declare function PaymentMethodWidget({ selector, onCustomRequest, onCustomPaymentMethodSelect, onCustomPaymentMethodUnselect, onLoadEnd, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PaymentMethodWidget.d.ts.map