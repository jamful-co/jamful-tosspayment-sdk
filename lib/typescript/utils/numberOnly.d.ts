interface Options {
    /**
     * @description 숫자로 이루어진 문자열에서 앞쪽의 '0'을 제거합니다.
     * @example
     *  numberOnly('abc00019900', { stripLeadingZeros: true }) // '19900'
     *  numberOnly('abc00019900', { stripLeadingZeros: false }) // '00019900'
     */
    stripLeadingZeros?: boolean;
}
export declare function numberOnly(text: string, options?: Options): string;
export {};
//# sourceMappingURL=numberOnly.d.ts.map