import { type ReactNode } from 'react';
import type { PaymentWidgetControl } from '../models/PaymentWidgetControl';
import type { PaymentWidgetOptions } from '../models/PaymentWidgetOptions';
interface ContextValue {
    clientKey: string;
    customerKey: string;
    options?: PaymentWidgetOptions;
}
export declare function usePaymentWidgetContext(): ContextValue;
interface Props {
    clientKey: string;
    customerKey: string;
    options?: PaymentWidgetOptions;
    children: ReactNode;
}
export declare function PaymentWidgetProvider({ children, clientKey, customerKey, options, }: Props): import("react/jsx-runtime").JSX.Element;
export declare function usePaymentWidget(): PaymentWidgetControl;
export {};
//# sourceMappingURL=usePaymentWidget.d.ts.map