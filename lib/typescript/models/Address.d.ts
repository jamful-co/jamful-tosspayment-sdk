export interface Address {
    /** 배송지 국가 정보입니다. */
    country: string;
    /** 배송지 상세 주소입니다. 도로명 및 건물(Street, Apt), 번지 정보입니다. 예를 들어 2nd St 105 같은 형태입니다. */
    line1?: string;
    /** 추가적인 배송지 상세 주소입니다. 번지 및 동 호수 정보가 길어질 때 사용합니다. 예를 들어 Unit #105 같은 형태입니다. */
    line2?: string;
    /** 배송지 주소입니다. 주(State, Province, Region) 정보입니다. 국가 별로 도시 체계에 따라 없는 경우가 있습니다. */
    area1?: string;
    /** 배송지 주소입니다. 도시(City) 정보입니다. 예를 들어 San Jose 같은 형태입니다. */
    area2: string;
    /** 배송지 우편번호입니다. */
    postalCode?: string;
}
//# sourceMappingURL=Address.d.ts.map