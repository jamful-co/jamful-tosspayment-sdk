import { Platform } from 'react-native';
import { Version } from '../utils/version';
import type { RuntimeEnvironment } from '../models/PaymentWidgetOptions';

export function useRuntimeEnvironment(): {
  runtimeEnvironment: RuntimeEnvironment;
} {
  return {
    runtimeEnvironment: {
      platform: Platform?.OS ?? 'unknown',
      sdkVersion: Version,
      osVersion: Platform?.Version ? `${Platform.Version}` : 'unknown',
    },
  };
}
