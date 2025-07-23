"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWidgetRegistry = useWidgetRegistry;
var _react = require("react");
const WidgetRegistry = new Map();
function useWidgetRegistry() {
  const [mainWidget, setMainWidget] = (0, _react.useState)(null);
  const [registry, setRegistry] = (0, _react.useState)(WidgetRegistry);
  const register = (selector, ref) => {
    if (registry.has(selector)) {
      return;
    }
    WidgetRegistry.set(selector, {
      isActive: false,
      ref
    });
    setRegistry(new Map(WidgetRegistry));
  };
  const unregister = selector => {
    if (registry.has(selector)) {
      WidgetRegistry.delete(selector);
      setRegistry(new Map(WidgetRegistry));
    }
  };
  const setActive = selector => {
    if (registry.has(selector) && registry.get(selector).isActive === false) {
      WidgetRegistry.set(selector, {
        isActive: true,
        ref: registry.get(selector).ref
      });
      setRegistry(new Map(WidgetRegistry));
    }
  };
  const isActive = selector => {
    var _registry$get;
    return ((_registry$get = registry.get(selector)) === null || _registry$get === void 0 ? void 0 : _registry$get.isActive) ?? false;
  };
  const getWidget = selector => {
    return registry.get(selector);
  };
  return {
    getWidget,
    register,
    unregister,
    setActive,
    isActive,
    mainWidget,
    setMainWidget
  };
}
//# sourceMappingURL=useWidgetRegistry.js.map