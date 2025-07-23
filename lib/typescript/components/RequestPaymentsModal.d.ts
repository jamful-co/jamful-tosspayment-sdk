import type { Fail, Success } from '../models/Result';
interface Props {
    requestPaymentHTML: string | null;
    isVisible: boolean;
    onEvaluateJavascript: (script: string) => void;
    onSuccess: (success: Success) => void;
    onFail: (fail: Fail) => void;
}
export declare function RequestPaymentsModal({ requestPaymentHTML, isVisible, onEvaluateJavascript, onSuccess, onFail, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RequestPaymentsModal.d.ts.map