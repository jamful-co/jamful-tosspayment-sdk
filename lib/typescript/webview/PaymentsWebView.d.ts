import React, { Component } from 'react';
import WebView, { type WebViewProps } from 'react-native-webview';
import type { WebViewSharedProps } from 'react-native-webview/lib/WebViewTypes';
import type { Fail } from '../models/Result';
type PaymentsWebViewProps = WebViewSharedProps & WebViewProps;
export declare class PaymentsWebView extends Component<PaymentsWebViewProps> {
    webRef: React.MutableRefObject<WebView | null>;
    resolveMap: Record<string, (resolve: any) => void>;
    rejectMap: Record<string, (reject: any) => void>;
    renderSuccess?: () => void;
    renderFail?: (fail: Fail) => void;
    isCurrentUrlAboutBlank: boolean;
    constructor(props: PaymentsWebViewProps);
    injectJavaScript: (javascript: string) => void;
    onMessage: (message: any) => void;
    render(): import("react/jsx-runtime").JSX.Element;
    /**
     * asyncEvaluateJavascript
     */
    asyncEvaluateJavascript(script: string, randomKey?: string): Promise<string>;
}
export {};
//# sourceMappingURL=PaymentsWebView.d.ts.map