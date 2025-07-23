import type { RefObject } from 'react';
import { PaymentsWebView } from './PaymentsWebView';
import { AgreementWidgetControl } from '../classes/AgreementWidgetControl';
export declare class AgreementWebView extends PaymentsWebView {
    renderAgreement(ref: RefObject<AgreementWebView>, widgetScript: String, selector: String, options?: {
        variantKey?: String;
    }): Promise<AgreementWidgetControl>;
}
//# sourceMappingURL=AgreementWebView.d.ts.map