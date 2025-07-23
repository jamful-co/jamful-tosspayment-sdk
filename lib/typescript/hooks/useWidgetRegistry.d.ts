import { PaymentsWebView } from '../webview/PaymentsWebView';
export declare function useWidgetRegistry(): {
    getWidget: (selector: string) => {
        isActive: boolean;
        ref: React.RefObject<PaymentsWebView>;
    } | undefined;
    register: (selector: string, ref: React.RefObject<PaymentsWebView>) => void;
    unregister: (selector: string) => void;
    setActive: (selector: string) => void;
    isActive: (selector: string) => boolean;
    mainWidget: import("react").RefObject<PaymentsWebView> | null;
    setMainWidget: import("react").Dispatch<import("react").SetStateAction<import("react").RefObject<PaymentsWebView> | null>>;
};
//# sourceMappingURL=useWidgetRegistry.d.ts.map