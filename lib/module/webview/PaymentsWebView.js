function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { Component } from 'react';
import { Alert, Linking } from 'react-native';
import WebView from 'react-native-webview';
export class PaymentsWebView extends Component {
  isCurrentUrlAboutBlank = false;
  constructor(props) {
    super(props);
    this.resolveMap = {};
    this.rejectMap = {};
    this.webRef = /*#__PURE__*/React.createRef();
  }
  injectJavaScript = javascript => {
    var _this$webRef$current;
    // NOTE(JooYang): iOS에서는 웹뷰 몽키패칭으로 about:blank 로 강제 이동하는데, 이때 스크립트가 실행되면 디버그 모드에서 에러 토스트가 발생하기 때문에 막아 줍니다.
    // @see {https://git.tosspayments.bz/tosspayments/widget-sdk-react-native/pull/1}
    if (this.isCurrentUrlAboutBlank) {
      return;
    }
    (_this$webRef$current = this.webRef.current) === null || _this$webRef$current === void 0 || _this$webRef$current.injectJavaScript(javascript);
  };
  onMessage = message => {
    if (message.nativeEvent.data !== undefined) {
      const jsonObject = JSON.parse(message.nativeEvent.data);
      switch (jsonObject.name) {
        case 'resolve':
          const resolve = this.resolveMap[jsonObject.params.key];
          resolve === null || resolve === void 0 || resolve(jsonObject.params.data);
          delete this.resolveMap[jsonObject.params.key];
          delete this.rejectMap[jsonObject.params.key];
          break;
        case 'reject':
          const reject = this.rejectMap[jsonObject.params.key];
          reject === null || reject === void 0 || reject(jsonObject.params.data);
          delete this.resolveMap[jsonObject.params.key];
          delete this.rejectMap[jsonObject.params.key];
          break;
        case 'changePaymentMethod':
          // do nothing;
          break;
        default:
          Alert.alert(`Widget에 ${jsonObject.name} 을 구현해주세요`);
          break;
      }
    }
  };
  render() {
    return /*#__PURE__*/React.createElement(WebView, _extends({
      ref: this.webRef,
      style: {
        // NOTE(JooYang): hardwareAccelerated 크래시 해결
        opacity: 0.99
      },
      onOpenWindow: event => {
        Linking.openURL(event.nativeEvent.targetUrl);
      }
    }, this.props, {
      onLoad: event => {
        this.isCurrentUrlAboutBlank = event.nativeEvent.url === 'about:blank';
      }
    }));
  }

  /**
   * asyncEvaluateJavascript
   */
  async asyncEvaluateJavascript(script, randomKey = '') {
    return new Promise((resolve, reject) => {
      var _this$webRef$current2;
      this.resolveMap[randomKey] = data => {
        resolve(JSON.stringify(data));
      };
      this.rejectMap[randomKey] = data => {
        reject(JSON.stringify(data));
      };
      (_this$webRef$current2 = this.webRef.current) === null || _this$webRef$current2 === void 0 || _this$webRef$current2.injectJavaScript(script);
    });
  }
}
//# sourceMappingURL=PaymentsWebView.js.map