export interface AgreementStatus {
  /** 고객이 모든 필수 약관에 동의했는지 알려줍니다. */
  agreedRequiredTerms: boolean;

  /** 개별 약관에 동의했는지 알려줍니다. */
  terms: AgreementTerm[];
}

export interface AgreementTerm {
  /** 약관의 식별자입니다. */
  id: string;

  /** 약관의 고객 동의 여부입니다. */
  agreed: boolean;

  /** 약관의 필수 여부입니다. */
  required: boolean;
}
