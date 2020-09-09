"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var clsx_1 = require("clsx");
var SortableHeaderCell_1 = require("./headerCells/SortableHeaderCell");
var ResizableHeaderCell_1 = require("./headerCells/ResizableHeaderCell");
function getAriaSort(sortDirection) {
    switch (sortDirection) {
        case 'ASC':
            return 'ascending';
        case 'DESC':
            return 'descending';
        default:
            return 'none';
    }
}
function HeaderCell(_a) {
    var column = _a.column, onResize = _a.onResize, allRowsSelected = _a.allRowsSelected, onAllRowsSelectionChange = _a.onAllRowsSelectionChange, sortColumn = _a.sortColumn, sortDirection = _a.sortDirection, onSort = _a.onSort;
    function getCell() {
        if (!column.headerRenderer)
            return column.name;
        return react_1.createElement(column.headerRenderer, { column: column, allRowsSelected: allRowsSelected, onAllRowsSelectionChange: onAllRowsSelectionChange });
    }
    var cell = getCell();
    if (column.sortable) {
        cell = (react_1.default.createElement(SortableHeaderCell_1.default, { column: column, onSort: onSort, sortColumn: sortColumn, sortDirection: sortDirection }, cell));
    }
    var className = clsx_1.default('rdg-cell', column.headerCellClass, {
        'rdg-cell-frozen': column.frozen,
        'rdg-cell-frozen-last': column.isLastFrozenColumn
    });
    var style = {
        width: column.width,
        left: column.left
    };
    cell = (react_1.default.createElement("div", { role: "columnheader", "aria-colindex": column.idx + 1, "aria-sort": sortColumn === column.key ? getAriaSort(sortDirection) : undefined, className: className, style: style }, cell));
    if (column.resizable) {
        cell = (react_1.default.createElement(ResizableHeaderCell_1.default, { column: column, onResize: onResize }, cell));
    }
    return cell;
}
exports.default = HeaderCell;
//# sourceMappingURL=HeaderCell.js.map