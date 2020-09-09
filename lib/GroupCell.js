"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var clsx_1 = require("clsx");
function GroupCell(_a) {
    var id = _a.id, rowIdx = _a.rowIdx, groupKey = _a.groupKey, childRows = _a.childRows, isExpanded = _a.isExpanded, isCellSelected = _a.isCellSelected, isRowSelected = _a.isRowSelected, eventBus = _a.eventBus, column = _a.column, groupColumnIndex = _a.groupColumnIndex;
    function toggleGroup() {
        eventBus.dispatch('TOGGLE_GROUP', id);
    }
    function onRowSelectionChange(checked) {
        eventBus.dispatch('SELECT_ROW', { rowIdx: rowIdx, checked: checked, isShiftClick: false });
    }
    // Only make the cell clickable if the group level matches
    var isLevelMatching = column.rowGroup && groupColumnIndex === column.idx;
    return (react_1.default.createElement("div", { role: "gridcell", "aria-colindex": column.idx + 1, key: column.key, className: clsx_1.default('rdg-cell', {
            'rdg-cell-frozen': column.frozen,
            'rdg-cell-frozen-last': column.isLastFrozenColumn,
            'rdg-cell-selected': isCellSelected
        }), style: {
            width: column.width,
            left: column.left,
            cursor: isLevelMatching ? 'pointer' : 'default'
        }, onClick: isLevelMatching ? toggleGroup : undefined }, column.groupFormatter && (!column.rowGroup || groupColumnIndex === column.idx) && (react_1.default.createElement(column.groupFormatter, { groupKey: groupKey, childRows: childRows, column: column, isExpanded: isExpanded, isCellSelected: isCellSelected, isRowSelected: isRowSelected, onRowSelectionChange: onRowSelectionChange, toggleGroup: toggleGroup }))));
}
exports.default = react_1.memo(GroupCell);
//# sourceMappingURL=GroupCell.js.map