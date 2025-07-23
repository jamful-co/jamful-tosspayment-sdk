import type { PaymentType } from './PaymentType';
export interface PaymentMethod {
    /** 결제 타입 정보입니다. NORMAL(일반결제), BRANDPAY(브랜드페이), KEYIN(키인 결제), CUSTOM(커스텀 결제수단) 중 하나입니다. **/
    type: PaymentType;
    /** 결제수단입니다. 카드, 가상계좌, 간편결제, 휴대폰, 계좌이체, 문화상품권, 도서문화상품권, 게임문화상품권 중 하나입니다. */
    method?: string;
    /** 결제수단이 간편결제일 때 반환되는 간편결제 정보입니다. */
    easypay?: {
        provider: string;
    };
    /** 결제 타입이 CUSTOM일 때 반환되는 커스텀 결제수단 키입니다. */
    paymentMethodKey?: string;
    /** 결제수단이 가상계좌일 때 반환되는 가상계좌 정보입니다. */
    transfer?: {
        provider: string;
    };
}
//# sourceMappingURL=PaymentMethod.d.ts.map