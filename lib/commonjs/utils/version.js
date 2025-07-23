"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Version = void 0;
var _package = _interopRequireDefault(require("../../package.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// package.json 파일을 읽어와서 JSON 파싱

const packageVersion = _package.default.version;
const Version = exports.Version = packageVersion;
//# sourceMappingURL=version.js.map