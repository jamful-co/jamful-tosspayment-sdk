import { Linking, Platform } from 'react-native';

export class ConvertUrl {
  url: string;
  appScheme?: string;
  appLink?: string;
  package?: string;

  constructor(getUrl: string) {
    this.url = getUrl;

    const splitUrl = this.url.replace(/:\/\//, ' ').split(' ');
    this.appScheme = splitUrl[0];

    if (Platform.OS === 'android') {
      if (this.isAppLink()) {
        if (this.appScheme?.includes('intent')) {
          const intentUrl = splitUrl[1]?.split('#Intent;') ?? [];
          let host = intentUrl[0] ?? '';

          if (host.includes(':')) {
            host = host.replace(/:/g, '%3A');
          }

          const splitedArguments = intentUrl[1]?.split(';') ?? [];

          if (this.appScheme !== 'intent') {
            this.appScheme = this.appScheme?.split(':')[1];
            this.appLink = `${this.appScheme}://${host}`;
          }

          for (const s of splitedArguments) {
            if (s.startsWith('package')) {
              const splitedPackage = s.split('=')[1];
              this.package = splitedPackage;
            } else if (s.startsWith('scheme')) {
              const scheme = s.split('=')[1];
              this.appLink = `${scheme}://${host}`;
              this.appScheme = scheme;
            }
          }
        } else {
          this.appLink = this.url;
        }
      } else {
        this.appLink = this.url;
      }
    } else if (Platform.OS === 'ios') {
      this.appLink =
        this.appScheme === 'itmss' ? `https://${splitUrl[1]}` : this.url;
    }
  }

  async getAppLink(): Promise<string | undefined> {
    return this.appLink;
  }

  async getMarketUrl(): Promise<string> {
    if (Platform.OS === 'android') {
      return `market://details?id=${this.package ?? ''}`;
    } else if (Platform.OS === 'ios') {
      switch (this.appScheme) {
        case 'supertoss':
          return 'https://apps.apple.com/app/id839333328';
        case 'ispmobile': // ISP
          return 'https://apps.apple.com/app/id369125087';
        case 'kb-acp': // KB국민
          return 'https://apps.apple.com/app/id695436326';
        case 'newliiv': // 리브 next
          return 'https://apps.apple.com/app/id1573528126';
        case 'kbbank': // KB 스타뱅크
          return 'https://apps.apple.com/app/id373742138';
        case 'mpocket.online.ansimclick': // 삼성
          return 'https://apps.apple.com/app/id535125356';
        case 'lottesmartpay': // 롯데 모바일
          return 'https://apps.apple.com/app/id668497947';
        case 'lotteappcard': // 롯데
          return 'https://apps.apple.com/app/id688047200';
        case 'lpayapp': // L.pay
          return 'https://apps.apple.com/app/id1036098908';
        case 'lmslpay': // 엘포인트
          return 'https://apps.apple.com/app/id473250588';
        case 'cloudpay': // 1Q페이
          return 'https://apps.apple.com/app/id847268987';
        case 'hanawalletmembers': // 하나머니
          return 'https://apps.apple.com/app/id1038288833';
        case 'hdcardappcardansimclick': // 현대
          return 'https://apps.apple.com/app/id702653088';
        case 'shinhan-sr-ansimclick': // 신한
          return 'https://apps.apple.com/app/id572462317';
        case 'wooripay': // 우리
          return 'https://apps.apple.com/app/id1201113419';
        case 'com.wooricard.wcard': // 우리WON
          return 'https://apps.apple.com/app/id1499598869';
        case 'newsmartpib': // 우리WON뱅킹
          return 'https://apps.apple.com/app/id1470181651';
        case 'nhallonepayansimclick': // NH
          return 'https://apps.apple.com/app/id1177889176';
        case 'citimobileapp': // 시티은행
          return 'https://apps.apple.com/app/id1179759666';
        case 'shinsegaeeasypayment': // SSGPAY
          return 'https://apps.apple.com/app/id666237916';
        case 'naversearchthirdlogin': // 네이버앱
          return 'https://apps.apple.com/app/id393499958';
        case 'payco': // 페이코
          return 'https://apps.apple.com/app/id924292102';
        case 'kakaotalk': // 카카오톡
          return 'https://apps.apple.com/app/id362057947';
        case 'kftc-bankpay': // 뱅크페이
          return 'https://apps.apple.com/app/id398456030';
        default:
          return this.url;
      }
    }
    return '';
  }

  isAppLink(): boolean {
    let scheme: string;
    try {
      scheme = new URL(this.url).protocol.replace(':', '');
    } catch (e) {
      scheme = this.appScheme ?? '';
    }
    return !['http', 'https', 'about', 'data', ''].includes(scheme);
  }

  async launchApp(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const appLink = await this.getAppLink();
        if (appLink) {
          await Linking.openURL(appLink);
          return true;
        } else {
          const marketUrl = await this.getMarketUrl();
          return Linking.openURL(marketUrl);
        }
      } catch (e) {
        const marketUrl = await this.getMarketUrl();
        return Linking.openURL(marketUrl);
      }
    } else if (Platform.OS === 'ios') {
      try {
        const appLink = await this.getAppLink();
        if (appLink) {
          await Linking.openURL(appLink);
          return true;
        } else {
          const marketUrl = await this.getMarketUrl();
          return Linking.openURL(marketUrl);
        }
      } catch (e) {
        const marketUrl = await this.getMarketUrl();
        return Linking.openURL(marketUrl);
      }
    }
    return false;
  }
}
