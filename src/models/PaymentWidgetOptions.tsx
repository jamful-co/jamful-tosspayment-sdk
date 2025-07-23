export interface PaymentWidgetOptions {
  brandpay?: PaymentWidgetBrandpayOptions;
}

export interface PaymentWidgetBrandpayOptions {
  redirectUrl: string;
}

export interface RuntimeEnvironment {
  platform: 'ios' | 'android' | 'windows' | 'macos' | 'web';
  sdkVersion: string;
  osVersion: string;
}
