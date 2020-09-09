"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleGroupFormatter = void 0;
var react_1 = require("react");
var hooks_1 = require("../hooks");
function ToggleGroupFormatter(_a) {
    var groupKey = _a.groupKey, isExpanded = _a.isExpanded, isCellSelected = _a.isCellSelected, toggleGroup = _a.toggleGroup;
    var cellRef = hooks_1.useFocusRef(isCellSelected);
    function handleKeyDown(_a) {
        var key = _a.key;
        if (key === 'Enter') {
            toggleGroup();
        }
    }
    var d = isExpanded ? 'M1 1 L 7 7 L 13 1' : 'M1 7 L 7 1 L 13 7';
    return (react_1.default.createElement("span", { ref: cellRef, className: "rdg-group-cell-content", tabIndex: -1, onKeyDown: handleKeyDown },
        groupKey,
        react_1.default.createElement("svg", { viewBox: "0 0 14 8", width: "14", height: "8", className: "rdg-caret" },
            react_1.default.createElement("path", { d: d }))));
}
exports.ToggleGroupFormatter = ToggleGroupFormatter;
//# sourceMappingURL=ToggleGroupFormatter.js.map