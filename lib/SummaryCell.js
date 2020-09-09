"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var clsx_1 = require("clsx");
function SummaryCell(_a) {
    var column = _a.column, row = _a.row;
    var SummaryFormatter = column.summaryFormatter, width = column.width, left = column.left, summaryCellClass = column.summaryCellClass;
    var className = clsx_1.default('rdg-cell', {
        'rdg-cell-frozen': column.frozen,
        'rdg-cell-frozen-last': column.isLastFrozenColumn
    }, typeof summaryCellClass === 'function' ? summaryCellClass(row) : summaryCellClass);
    return (react_1.default.createElement("div", { role: "gridcell", "aria-colindex": column.idx + 1, className: className, style: { width: width, left: left } }, SummaryFormatter && react_1.default.createElement(SummaryFormatter, { column: column, row: row })));
}
exports.default = react_1.memo(SummaryCell);
//# sourceMappingURL=SummaryCell.js.map