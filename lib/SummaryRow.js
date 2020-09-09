"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SummaryCell_1 = require("./SummaryCell");
function SummaryRow(_a) {
    var rowIdx = _a.rowIdx, row = _a.row, viewportColumns = _a.viewportColumns, bottom = _a.bottom, ariaRowIndex = _a["aria-rowindex"];
    return (react_1.default.createElement("div", { role: "row", "aria-rowindex": ariaRowIndex, className: "rdg-row rdg-row-" + (rowIdx % 2 === 0 ? 'even' : 'odd') + " rdg-summary-row", style: { bottom: bottom } }, viewportColumns.map(function (column) { return (react_1.default.createElement(SummaryCell_1.default, { key: column.key, column: column, row: row })); })));
}
exports.default = react_1.memo(SummaryRow);
//# sourceMappingURL=SummaryRow.js.map