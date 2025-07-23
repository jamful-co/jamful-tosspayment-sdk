export function numberOnly(text, options = {}) {
  var _text$match;
  const value = ((_text$match = text.match(/\d+/g)) === null || _text$match === void 0 ? void 0 : _text$match.join(``)) ?? ``;
  return options.stripLeadingZeros === true ? stripLeadingZeros(value) : value;
}
function stripLeadingZeros(value) {
  return value.replace(/^0+/, '');
}
//# sourceMappingURL=numberOnly.js.map