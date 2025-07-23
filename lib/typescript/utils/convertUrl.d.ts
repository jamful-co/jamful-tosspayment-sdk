export declare class ConvertUrl {
    url: string;
    appScheme?: string;
    appLink?: string;
    package?: string;
    constructor(getUrl: string);
    getAppLink(): Promise<string | undefined>;
    getMarketUrl(): Promise<string>;
    isAppLink(): boolean;
    launchApp(): Promise<boolean>;
}
//# sourceMappingURL=convertUrl.d.ts.map