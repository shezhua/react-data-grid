"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var HeaderCell_1 = require("./HeaderCell");
var utils_1 = require("./utils");
function HeaderRow(_a) {
    var columns = _a.columns, rows = _a.rows, rowKey = _a.rowKey, onSelectedRowsChange = _a.onSelectedRowsChange, allRowsSelected = _a.allRowsSelected, onColumnResize = _a.onColumnResize, sortColumn = _a.sortColumn, sortDirection = _a.sortDirection, onSort = _a.onSort;
    var handleAllRowsSelectionChange = react_1.useCallback(function (checked) {
        var e_1, _a;
        if (!onSelectedRowsChange)
            return;
        utils_1.assertIsValidKey(rowKey);
        var newSelectedRows = new Set();
        if (checked) {
            try {
                for (var rows_1 = __values(rows), rows_1_1 = rows_1.next(); !rows_1_1.done; rows_1_1 = rows_1.next()) {
                    var row = rows_1_1.value;
                    newSelectedRows.add(row[rowKey]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (rows_1_1 && !rows_1_1.done && (_a = rows_1.return)) _a.call(rows_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        onSelectedRowsChange(newSelectedRows);
    }, [onSelectedRowsChange, rows, rowKey]);
    return (react_1.default.createElement("div", { role: "row", "aria-rowindex": 1, className: "rdg-header-row" }, columns.map(function (column) {
        return (react_1.default.createElement(HeaderCell_1.default, { key: column.key, column: column, onResize: onColumnResize, allRowsSelected: allRowsSelected, onAllRowsSelectionChange: handleAllRowsSelectionChange, onSort: onSort, sortColumn: sortColumn, sortDirection: sortDirection }));
    })));
}
exports.default = react_1.memo(HeaderRow);
//# sourceMappingURL=HeaderRow.js.map