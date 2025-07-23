import { useState } from 'react';
import { PaymentsWebView } from '../webview/PaymentsWebView';

const WidgetRegistry = new Map<
  string,
  { isActive: boolean; ref: React.RefObject<PaymentsWebView> }
>();

export function useWidgetRegistry() {
  const [mainWidget, setMainWidget] =
    useState<React.RefObject<PaymentsWebView> | null>(null);
  const [registry, setRegistry] =
    useState<typeof WidgetRegistry>(WidgetRegistry);

  const register = (
    selector: string,
    ref: React.RefObject<PaymentsWebView>
  ) => {
    if (registry.has(selector)) {
      return;
    }

    WidgetRegistry.set(selector, { isActive: false, ref });
    setRegistry(new Map(WidgetRegistry));
  };

  const unregister = (selector: string) => {
    if (registry.has(selector)) {
      WidgetRegistry.delete(selector);
      setRegistry(new Map(WidgetRegistry));
    }
  };

  const setActive = (selector: string) => {
    if (registry.has(selector) && registry.get(selector)!.isActive === false) {
      WidgetRegistry.set(selector, {
        isActive: true,
        ref: registry.get(selector)!.ref,
      });
      setRegistry(new Map(WidgetRegistry));
    }
  };

  const isActive = (selector: string) => {
    return registry.get(selector)?.isActive ?? false;
  };

  const getWidget = (selector: string) => {
    return registry.get(selector);
  };

  return {
    getWidget,
    register,
    unregister,
    setActive,
    isActive,
    mainWidget,
    setMainWidget,
  };
}
