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
var clsx_1 = require("clsx");
var utils_1 = require("./utils");
var hooks_1 = require("./hooks");
function Cell(_a, ref) {
    var className = _a.className, column = _a.column, isCellSelected = _a.isCellSelected, isCopied = _a.isCopied, isDraggedOver = _a.isDraggedOver, isRowSelected = _a.isRowSelected, row = _a.row, rowIdx = _a.rowIdx, eventBus = _a.eventBus, dragHandleProps = _a.dragHandleProps, onRowClick = _a.onRowClick, onFocus = _a.onFocus, onKeyDown = _a.onKeyDown, onClick = _a.onClick, onDoubleClick = _a.onDoubleClick, onContextMenu = _a.onContextMenu, props = __rest(_a, ["className", "column", "isCellSelected", "isCopied", "isDraggedOver", "isRowSelected", "row", "rowIdx", "eventBus", "dragHandleProps", "onRowClick", "onFocus", "onKeyDown", "onClick", "onDoubleClick", "onContextMenu"]);
    var cellRef = react_1.useRef(null);
    var cellClass = column.cellClass;
    className = clsx_1.default('rdg-cell', {
        'rdg-cell-frozen': column.frozen,
        'rdg-cell-frozen-last': column.isLastFrozenColumn,
        'rdg-cell-selected': isCellSelected,
        'rdg-cell-copied': isCopied,
        'rdg-cell-dragged-over': isDraggedOver
    }, typeof cellClass === 'function' ? cellClass(row) : cellClass, className);
    function selectCell(openEditor) {
        eventBus.dispatch('SELECT_CELL', { idx: column.idx, rowIdx: rowIdx }, openEditor);
    }
    function handleClick() {
        var _a;
        selectCell((_a = column.editorOptions) === null || _a === void 0 ? void 0 : _a.editOnClick);
        onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick(rowIdx, row, column);
    }
    function handleContextMenu() {
        selectCell();
    }
    function handleDoubleClick() {
        selectCell(true);
    }
    function onRowSelectionChange(checked, isShiftClick) {
        eventBus.dispatch('SELECT_ROW', { rowIdx: rowIdx, checked: checked, isShiftClick: isShiftClick });
    }
    return (react_1.default.createElement("div", __assign({ role: "gridcell", "aria-colindex": column.idx + 1, "aria-selected": isCellSelected, ref: hooks_1.useCombinedRefs(cellRef, ref), className: className, style: {
            width: column.width,
            left: column.left
        }, onFocus: onFocus, onKeyDown: onKeyDown, onClick: utils_1.wrapEvent(handleClick, onClick), onDoubleClick: utils_1.wrapEvent(handleDoubleClick, onDoubleClick), onContextMenu: utils_1.wrapEvent(handleContextMenu, onContextMenu) }, props), !column.rowGroup && (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(column.formatter, { column: column, rowIdx: rowIdx, row: row, isCellSelected: isCellSelected, isRowSelected: isRowSelected, onRowSelectionChange: onRowSelectionChange }),
        dragHandleProps && (react_1.default.createElement("div", __assign({ className: "rdg-cell-drag-handle" }, dragHandleProps)))))));
}
exports.default = react_1.memo(react_1.forwardRef(Cell));
//# sourceMappingURL=Cell.js.map