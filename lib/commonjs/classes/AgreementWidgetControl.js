"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgreementWidgetControl = void 0;
var _generateRandomUUID = require("../utils/generateRandomUUID");
class AgreementWidgetControl {
  constructor(ref) {
    this.ref = ref;
  }
  getAgreementStatus = async () => {
    return new Promise(async (resolve, reject) => {
      var _this$ref;
      const sessionKey = (0, _generateRandomUUID.generateRandomUUID)();
      const status = await ((_this$ref = this.ref) === null || _this$ref === void 0 || (_this$ref = _this$ref.current) === null || _this$ref === void 0 ? void 0 : _this$ref.asyncEvaluateJavascript(`
      window.ReactNativeWebView.postMessage(JSON.stringify({
        name: 'resolve',
        params: {
          key: '${sessionKey}',
          data: agreementWidget.getAgreementStatus()
        }
      }));
      true;
    `, sessionKey));
      if (status === undefined) {
        reject('status is undefined');
      } else {
        resolve(JSON.parse(status));
      }
    });
  };
}
exports.AgreementWidgetControl = AgreementWidgetControl;
//# sourceMappingURL=AgreementWidgetControl.js.map