import { generateRandomUUID } from '../utils/generateRandomUUID';
export class AgreementWidgetControl {
  constructor(ref) {
    this.ref = ref;
  }
  getAgreementStatus = async () => {
    return new Promise(async (resolve, reject) => {
      var _this$ref;
      const sessionKey = generateRandomUUID();
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
//# sourceMappingURL=AgreementWidgetControl.js.map