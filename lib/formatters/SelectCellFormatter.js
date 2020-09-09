"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectCellFormatter = void 0;
var react_1 = require("react");
var clsx_1 = require("clsx");
var hooks_1 = require("../hooks");
function SelectCellFormatter(_a) {
    var value = _a.value, tabIndex = _a.tabIndex, isCellSelected = _a.isCellSelected, disabled = _a.disabled, onClick = _a.onClick, onChange = _a.onChange, ariaLabel = _a["aria-label"], ariaLabelledBy = _a["aria-labelledby"];
    var inputRef = hooks_1.useFocusRef(isCellSelected);
    function handleChange(e) {
        onChange(e.target.checked, e.nativeEvent.shiftKey);
    }
    return (react_1.default.createElement("label", { className: clsx_1.default('rdg-checkbox-label', { 'rdg-checkbox-label-disabled': disabled }) },
        react_1.default.createElement("input", { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, tabIndex: tabIndex, ref: inputRef, type: "checkbox", className: "rdg-checkbox-input", disabled: disabled, checked: value, onChange: handleChange, onClick: onClick }),
        react_1.default.createElement("div", { className: "rdg-checkbox" })));
}
exports.SelectCellFormatter = SelectCellFormatter;
//# sourceMappingURL=SelectCellFormatter.js.map