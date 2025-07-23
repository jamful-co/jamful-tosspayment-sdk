import type { AgreementStatus } from './AgreementStatus';

export interface AgreementWidgetControl {
  getAgreementStatus: () => Promise<AgreementStatus>;
}
