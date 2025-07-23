"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRuntimeEnvironment = useRuntimeEnvironment;
var _reactNative = require("react-native");
var _version = require("../utils/version");
function useRuntimeEnvironment() {
  return {
    runtimeEnvironment: {
      platform: (_reactNative.Platform === null || _reactNative.Platform === void 0 ? void 0 : _reactNative.Platform.OS) ?? 'unknown',
      sdkVersion: _version.Version,
      osVersion: _reactNative.Platform !== null && _reactNative.Platform !== void 0 && _reactNative.Platform.Version ? `${_reactNative.Platform.Version}` : 'unknown'
    }
  };
}
//# sourceMappingURL=useRuntimeEnvironment.js.map