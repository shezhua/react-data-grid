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
var Cell_1 = require("./Cell");
var EditCell_1 = require("./EditCell");
var utils_1 = require("./utils");
function Row(_a, ref) {
    var _b = _a.cellRenderer, CellRenderer = _b === void 0 ? Cell_1.default : _b, className = _a.className, eventBus = _a.eventBus, rowIdx = _a.rowIdx, isRowSelected = _a.isRowSelected, copiedCellIdx = _a.copiedCellIdx, draggedOverCellIdx = _a.draggedOverCellIdx, row = _a.row, viewportColumns = _a.viewportColumns, selectedCellProps = _a.selectedCellProps, onRowClick = _a.onRowClick, rowClass = _a.rowClass, setDraggedOverRowIdx = _a.setDraggedOverRowIdx, onMouseEnter = _a.onMouseEnter, top = _a.top, ariaRowIndex = _a["aria-rowindex"], ariaSelected = _a["aria-selected"], props = __rest(_a, ["cellRenderer", "className", "eventBus", "rowIdx", "isRowSelected", "copiedCellIdx", "draggedOverCellIdx", "row", "viewportColumns", "selectedCellProps", "onRowClick", "rowClass", "setDraggedOverRowIdx", "onMouseEnter", "top", 'aria-rowindex', 'aria-selected']);
    function handleDragEnter() {
        setDraggedOverRowIdx === null || setDraggedOverRowIdx === void 0 ? void 0 : setDraggedOverRowIdx(rowIdx);
    }
    className = clsx_1.default('rdg-row', "rdg-row-" + (rowIdx % 2 === 0 ? 'even' : 'odd'), {
        'rdg-row-selected': isRowSelected,
        'rdg-group-row-selected': (selectedCellProps === null || selectedCellProps === void 0 ? void 0 : selectedCellProps.idx) === -1
    }, rowClass === null || rowClass === void 0 ? void 0 : rowClass(row), className);
    return (react_1.default.createElement("div", __assign({ role: "row", "aria-rowindex": ariaRowIndex, "aria-selected": ariaSelected, ref: ref, className: className, onMouseEnter: utils_1.wrapEvent(handleDragEnter, onMouseEnter), style: { top: top } }, props), viewportColumns.map(function (column) {
        var isCellSelected = (selectedCellProps === null || selectedCellProps === void 0 ? void 0 : selectedCellProps.idx) === column.idx;
        if ((selectedCellProps === null || selectedCellProps === void 0 ? void 0 : selectedCellProps.mode) === 'EDIT' && isCellSelected) {
            return (react_1.default.createElement(EditCell_1.default, { key: column.key, rowIdx: rowIdx, column: column, row: row, onKeyDown: selectedCellProps.onKeyDown, editorPortalTarget: selectedCellProps.editorPortalTarget, editorContainerProps: selectedCellProps.editorContainerProps, editor2Props: selectedCellProps.editor2Props }));
        }
        return (react_1.default.createElement(CellRenderer, { key: column.key, rowIdx: rowIdx, column: column, row: row, isCopied: copiedCellIdx === column.idx, isDraggedOver: draggedOverCellIdx === column.idx, isCellSelected: isCellSelected, isRowSelected: isRowSelected, eventBus: eventBus, dragHandleProps: isCellSelected ? selectedCellProps.dragHandleProps : undefined, onFocus: isCellSelected ? selectedCellProps.onFocus : undefined, onKeyDown: isCellSelected ? selectedCellProps.onKeyDown : undefined, onRowClick: onRowClick }));
    })));
}
exports.default = react_1.memo(react_1.forwardRef(Row));
//# sourceMappingURL=Row.js.map