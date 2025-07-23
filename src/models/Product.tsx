export interface Product {
  /** 상품 이름입니다. */
  name: string;

  /** 상품 구매 수량입니다. */
  quantity: number;

  /** 상품의 가격입니다. 전체를 합한 가격이 아닌 상품의 개당 가격입니다.*/
  unitamount: number;

  /** 상품 가격의 통화입니다.*/
  currency: string;

  /** 상품에 대한 부가적인 설명입니다.*/
  description: string;
}
