import type { AgreementStatus } from '../models/AgreementStatus';
interface Props {
    selector: string;
    onChange?: (agreementStatus: AgreementStatus) => void;
    onLoadEnd: () => void;
}
export declare function AgreementWidget({ selector, onChange, onLoadEnd }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AgreementWidget.d.ts.map