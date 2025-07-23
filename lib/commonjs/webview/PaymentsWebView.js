"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentsWebView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeWebview = _interopRequireDefault(require("react-native-webview"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class PaymentsWebView extends _react.Component {
  isCurrentUrlAboutBlank = false;
  constructor(props) {
    super(props);
    this.resolveMap = {};
    this.rejectMap = {};
    this.webRef = /*#__PURE__*/_react.default.createRef();
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
          _reactNative.Alert.alert(`Widget에 ${jsonObject.name} 을 구현해주세요`);
          break;
      }
    }
  };
  render() {
    return /*#__PURE__*/_react.default.createElement(_reactNativeWebview.default, _extends({
      ref: this.webRef,
      style: {
        // NOTE(JooYang): hardwareAccelerated 크래시 해결
        opacity: 0.99
      },
      onOpenWindow: event => {
        _reactNative.Linking.openURL(event.nativeEvent.targetUrl);
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
exports.PaymentsWebView = PaymentsWebView;
//# sourceMappingURL=PaymentsWebView.js.map