"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConvertUrl = void 0;
var _reactNative = require("react-native");
class ConvertUrl {
  constructor(getUrl) {
    this.url = getUrl;
    const splitUrl = this.url.replace(/:\/\//, ' ').split(' ');
    this.appScheme = splitUrl[0];
    if (_reactNative.Platform.OS === 'android') {
      if (this.isAppLink()) {
        var _this$appScheme;
        if ((_this$appScheme = this.appScheme) !== null && _this$appScheme !== void 0 && _this$appScheme.includes('intent')) {
          var _splitUrl$, _intentUrl$;
          const intentUrl = ((_splitUrl$ = splitUrl[1]) === null || _splitUrl$ === void 0 ? void 0 : _splitUrl$.split('#Intent;')) ?? [];
          let host = intentUrl[0] ?? '';
          if (host.includes(':')) {
            host = host.replace(/:/g, '%3A');
          }
          const splitedArguments = ((_intentUrl$ = intentUrl[1]) === null || _intentUrl$ === void 0 ? void 0 : _intentUrl$.split(';')) ?? [];
          if (this.appScheme !== 'intent') {
            var _this$appScheme2;
            this.appScheme = (_this$appScheme2 = this.appScheme) === null || _this$appScheme2 === void 0 ? void 0 : _this$appScheme2.split(':')[1];
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
    } else if (_reactNative.Platform.OS === 'ios') {
      this.appLink = this.appScheme === 'itmss' ? `https://${splitUrl[1]}` : this.url;
    }
  }
  async getAppLink() {
    return this.appLink;
  }
  async getMarketUrl() {
    if (_reactNative.Platform.OS === 'android') {
      return `market://details?id=${this.package ?? ''}`;
    } else if (_reactNative.Platform.OS === 'ios') {
      switch (this.appScheme) {
        case 'supertoss':
          return 'https://apps.apple.com/app/id839333328';
        case 'ispmobile':
          // ISP
          return 'https://apps.apple.com/app/id369125087';
        case 'kb-acp':
          // KB국민
          return 'https://apps.apple.com/app/id695436326';
        case 'newliiv':
          // 리브 next
          return 'https://apps.apple.com/app/id1573528126';
        case 'kbbank':
          // KB 스타뱅크
          return 'https://apps.apple.com/app/id373742138';
        case 'mpocket.online.ansimclick':
          // 삼성
          return 'https://apps.apple.com/app/id535125356';
        case 'lottesmartpay':
          // 롯데 모바일
          return 'https://apps.apple.com/app/id668497947';
        case 'lotteappcard':
          // 롯데
          return 'https://apps.apple.com/app/id688047200';
        case 'lpayapp':
          // L.pay
          return 'https://apps.apple.com/app/id1036098908';
        case 'lmslpay':
          // 엘포인트
          return 'https://apps.apple.com/app/id473250588';
        case 'cloudpay':
          // 1Q페이
          return 'https://apps.apple.com/app/id847268987';
        case 'hanawalletmembers':
          // 하나머니
          return 'https://apps.apple.com/app/id1038288833';
        case 'hdcardappcardansimclick':
          // 현대
          return 'https://apps.apple.com/app/id702653088';
        case 'shinhan-sr-ansimclick':
          // 신한
          return 'https://apps.apple.com/app/id572462317';
        case 'wooripay':
          // 우리
          return 'https://apps.apple.com/app/id1201113419';
        case 'com.wooricard.wcard':
          // 우리WON
          return 'https://apps.apple.com/app/id1499598869';
        case 'newsmartpib':
          // 우리WON뱅킹
          return 'https://apps.apple.com/app/id1470181651';
        case 'nhallonepayansimclick':
          // NH
          return 'https://apps.apple.com/app/id1177889176';
        case 'citimobileapp':
          // 시티은행
          return 'https://apps.apple.com/app/id1179759666';
        case 'shinsegaeeasypayment':
          // SSGPAY
          return 'https://apps.apple.com/app/id666237916';
        case 'naversearchthirdlogin':
          // 네이버앱
          return 'https://apps.apple.com/app/id393499958';
        case 'payco':
          // 페이코
          return 'https://apps.apple.com/app/id924292102';
        case 'kakaotalk':
          // 카카오톡
          return 'https://apps.apple.com/app/id362057947';
        case 'kftc-bankpay':
          // 뱅크페이
          return 'https://apps.apple.com/app/id398456030';
        default:
          return this.url;
      }
    }
    return '';
  }
  isAppLink() {
    let scheme;
    try {
      scheme = new URL(this.url).protocol.replace(':', '');
    } catch (e) {
      scheme = this.appScheme ?? '';
    }
    return !['http', 'https', 'about', 'data', ''].includes(scheme);
  }
  async launchApp() {
    if (_reactNative.Platform.OS === 'android') {
      try {
        const appLink = await this.getAppLink();
        if (appLink) {
          await _reactNative.Linking.openURL(appLink);
          return true;
        } else {
          const marketUrl = await this.getMarketUrl();
          return _reactNative.Linking.openURL(marketUrl);
        }
      } catch (e) {
        const marketUrl = await this.getMarketUrl();
        return _reactNative.Linking.openURL(marketUrl);
      }
    } else if (_reactNative.Platform.OS === 'ios') {
      try {
        const appLink = await this.getAppLink();
        if (appLink) {
          await _reactNative.Linking.openURL(appLink);
          return true;
        } else {
          const marketUrl = await this.getMarketUrl();
          return _reactNative.Linking.openURL(marketUrl);
        }
      } catch (e) {
        const marketUrl = await this.getMarketUrl();
        return _reactNative.Linking.openURL(marketUrl);
      }
    }
    return false;
  }
}
exports.ConvertUrl = ConvertUrl;
//# sourceMappingURL=convertUrl.js.map