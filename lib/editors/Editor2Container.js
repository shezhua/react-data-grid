"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var hooks_1 = require("../hooks");
function Editor2Container(_a) {
    var _b;
    var row = _a.row, column = _a.column, onRowChange = _a.onRowChange, editorPortalTarget = _a.editorPortalTarget, props = __rest(_a, ["row", "column", "onRowChange", "editorPortalTarget"]);
    var onClickCapture = hooks_1.useClickOutside(function () { return onRowChange(row, true); });
    if (column.editor2 === undefined)
        return null;
    var editor = (react_1.default.createElement("div", { onClickCapture: onClickCapture },
        react_1.default.createElement(column.editor2, __assign({ row: row, column: column, onRowChange: onRowChange, editorPortalTarget: editorPortalTarget }, props))));
    if ((_b = column.editorOptions) === null || _b === void 0 ? void 0 : _b.createPortal) {
        return react_dom_1.createPortal(editor, editorPortalTarget);
    }
    return editor;
}
exports.default = Editor2Container;
//# sourceMappingURL=Editor2Container.js.map