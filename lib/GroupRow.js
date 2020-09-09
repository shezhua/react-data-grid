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
var Columns_1 = require("./Columns");
var GroupCell_1 = require("./GroupCell");
function GroupedRow(_a) {
    var id = _a.id, groupKey = _a.groupKey, viewportColumns = _a.viewportColumns, childRows = _a.childRows, rowIdx = _a.rowIdx, top = _a.top, level = _a.level, isExpanded = _a.isExpanded, selectedCellIdx = _a.selectedCellIdx, isRowSelected = _a.isRowSelected, eventBus = _a.eventBus, props = __rest(_a, ["id", "groupKey", "viewportColumns", "childRows", "rowIdx", "top", "level", "isExpanded", "selectedCellIdx", "isRowSelected", "eventBus"]);
    // Select is always the first column
    var idx = viewportColumns[0].key === Columns_1.SELECT_COLUMN_KEY ? level + 1 : level;
    function selectGroup() {
        eventBus.dispatch('SELECT_CELL', { rowIdx: rowIdx, idx: -1 });
    }
    return (react_1.default.createElement("div", __assign({ role: "row", "aria-level": level, "aria-expanded": isExpanded, className: clsx_1.default('rdg-row', 'rdg-group-row', "rdg-row-" + (rowIdx % 2 === 0 ? 'even' : 'odd'), {
            'rdg-row-selected': isRowSelected,
            'rdg-group-row-selected': selectedCellIdx === -1 // Select row if there is no selected cell
        }), onClick: selectGroup, style: { top: top } }, props), viewportColumns.map(function (column) { return (react_1.default.createElement(GroupCell_1.default, { key: column.key, id: id, rowIdx: rowIdx, groupKey: groupKey, childRows: childRows, isExpanded: isExpanded, isRowSelected: isRowSelected, isCellSelected: selectedCellIdx === column.idx, eventBus: eventBus, column: column, groupColumnIndex: idx })); })));
}
exports.default = react_1.memo(GroupedRow);
//# sourceMappingURL=GroupRow.js.map