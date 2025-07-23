export declare const htmlString: ({ stage, selector, }: {
    stage: string;
    selector: string;
}) => string;
export declare const defaultInjectedJavascript = "\nwindow.PaymentWidgetReactNativeSDK = {\n  message: {\n    postMessage: function(message) {\n      window.ReactNativeWebView.postMessage(message);\n    }\n  },\n  error: {\n    postMessage: function(error) {\n      window.ReactNativeWebView.postMessage(JSON.stringify({\n        name: 'error', \n        params: JSON.parse(error)\n      }));\n    }\n  },\n};\ntrue\n";
//# sourceMappingURL=html.d.ts.map