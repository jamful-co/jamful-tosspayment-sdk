export interface EscrowProduct {
    /** 상품의 ID입니다. 이 값은 유니크해야 합니다.*/
    id: string;
    /** 상품 이름입니다. */
    name: string;
    /** 상점에서 사용하는 상품 관리 코드입니다. */
    code: string;
    /** 상품의 가격입니다. 전체를 합한 가격이 아닌 상품의 개당 가격입니다. */
    unitPrice: number;
    /** 상품 구매 수량입니다.    */
    quantity: number;
}
//# sourceMappingURL=EscrowProduct.d.ts.map