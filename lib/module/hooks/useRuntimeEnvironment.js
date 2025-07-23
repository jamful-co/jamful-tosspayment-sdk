import { Platform } from 'react-native';
import { Version } from '../utils/version';
export function useRuntimeEnvironment() {
  return {
    runtimeEnvironment: {
      platform: (Platform === null || Platform === void 0 ? void 0 : Platform.OS) ?? 'unknown',
      sdkVersion: Version,
      osVersion: Platform !== null && Platform !== void 0 && Platform.Version ? `${Platform.Version}` : 'unknown'
    }
  };
}
//# sourceMappingURL=useRuntimeEnvironment.js.map