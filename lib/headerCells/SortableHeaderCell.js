"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SORT_TEXT = {
    ASC: '\u25B2',
    DESC: '\u25BC',
    NONE: ''
};
function SortableHeaderCell(_a) {
    var column = _a.column, onSort = _a.onSort, sortColumn = _a.sortColumn, sortDirection = _a.sortDirection, children = _a.children;
    sortDirection = sortColumn === column.key && sortDirection || 'NONE';
    function onClick() {
        if (!onSort)
            return;
        var sortDescendingFirst = column.sortDescendingFirst || false;
        var direction;
        switch (sortDirection) {
            case 'ASC':
                direction = sortDescendingFirst ? 'NONE' : 'DESC';
                break;
            case 'DESC':
                direction = sortDescendingFirst ? 'ASC' : 'NONE';
                break;
            default:
                direction = sortDescendingFirst ? 'DESC' : 'ASC';
                break;
        }
        onSort(column.key, direction);
    }
    return (react_1.default.createElement("span", { className: "rdg-header-sort-cell", onClick: onClick },
        react_1.default.createElement("span", { className: "rdg-header-sort-name" }, children),
        react_1.default.createElement("span", null, SORT_TEXT[sortDirection])));
}
exports.default = SortableHeaderCell;
//# sourceMappingURL=SortableHeaderCell.js.map