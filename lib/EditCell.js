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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var clsx_1 = require("clsx");
var editors_1 = require("./editors");
var hooks_1 = require("./hooks");
function EditCell(_a, ref) {
    var className = _a.className, column = _a.column, row = _a.row, rowIdx = _a.rowIdx, editorPortalTarget = _a.editorPortalTarget, editorContainerProps = _a.editorContainerProps, editor2Props = _a.editor2Props, onKeyDown = _a.onKeyDown, props = __rest(_a, ["className", "column", "row", "rowIdx", "editorPortalTarget", "editorContainerProps", "editor2Props", "onKeyDown"]);
    var _b = __read(react_1.useState(null), 2), dimensions = _b[0], setDimensions = _b[1];
    var cellRef = react_1.useCallback(function (node) {
        if (node !== null) {
            var _a = node.getBoundingClientRect(), left = _a.left, top_1 = _a.top;
            setDimensions({ left: left, top: top_1 });
        }
    }, []);
    var cellClass = column.cellClass;
    className = clsx_1.default('rdg-cell', {
        'rdg-cell-frozen': column.frozen,
        'rdg-cell-frozen-last': column.isLastFrozenColumn
    }, 'rdg-cell-selected', 'rdg-cell-editing', typeof cellClass === 'function' ? cellClass(row) : cellClass, className);
    function getCellContent() {
        var _a;
        if (dimensions === null)
            return;
        var _b = document.scrollingElement || document.documentElement, docTop = _b.scrollTop, docLeft = _b.scrollLeft;
        var left = dimensions.left, top = dimensions.top;
        var gridLeft = left + docLeft;
        var gridTop = top + docTop;
        if (column.editor2 !== undefined) {
            return (react_1.default.createElement(editors_1.EditorContainer2, __assign({}, editor2Props, { editorPortalTarget: editorPortalTarget, rowIdx: rowIdx, column: column, left: gridLeft, top: gridTop })));
        }
        var editor = (react_1.default.createElement(editors_1.EditorContainer, __assign({}, editorContainerProps, { rowIdx: rowIdx, row: row, column: column, left: gridLeft, top: gridTop })));
        if (((_a = column.editorOptions) === null || _a === void 0 ? void 0 : _a.createPortal) !== false) {
            return (react_1.default.createElement(editors_1.EditorPortal, { target: editorPortalTarget }, editor));
        }
        return editor;
    }
    return (react_1.default.createElement("div", __assign({ role: "gridcell", "aria-colindex": column.idx + 1, "aria-selected": true, ref: hooks_1.useCombinedRefs(cellRef, ref), className: className, style: {
            width: column.width,
            left: column.left
        }, onKeyDown: onKeyDown }, props), getCellContent()));
}
exports.default = react_1.forwardRef(EditCell);
//# sourceMappingURL=EditCell.js.map