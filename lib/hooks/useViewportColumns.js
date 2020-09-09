"use strict";
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
exports.useViewportColumns = void 0;
var react_1 = require("react");
var utils_1 = require("../utils");
var formatters_1 = require("../formatters");
function useViewportColumns(_a) {
    var _b, _c, _d, _e;
    var rawColumns = _a.rawColumns, columnWidths = _a.columnWidths, viewportWidth = _a.viewportWidth, scrollLeft = _a.scrollLeft, defaultColumnOptions = _a.defaultColumnOptions, rawGroupBy = _a.rawGroupBy, rowGrouper = _a.rowGrouper;
    var minColumnWidth = (_b = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.minWidth) !== null && _b !== void 0 ? _b : 80;
    var defaultFormatter = (_c = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.formatter) !== null && _c !== void 0 ? _c : formatters_1.ValueFormatter;
    var defaultSortable = (_d = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.sortable) !== null && _d !== void 0 ? _d : false;
    var defaultResizable = (_e = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.resizable) !== null && _e !== void 0 ? _e : false;
    var _f = react_1.useMemo(function () {
        return utils_1.getColumnMetrics({
            rawColumns: rawColumns,
            minColumnWidth: minColumnWidth,
            viewportWidth: viewportWidth,
            columnWidths: columnWidths,
            defaultSortable: defaultSortable,
            defaultResizable: defaultResizable,
            defaultFormatter: defaultFormatter,
            rawGroupBy: rowGrouper ? rawGroupBy : undefined
        });
    }, [columnWidths, defaultFormatter, defaultResizable, defaultSortable, minColumnWidth, rawColumns, rawGroupBy, rowGrouper, viewportWidth]), columns = _f.columns, lastFrozenColumnIndex = _f.lastFrozenColumnIndex, totalColumnWidth = _f.totalColumnWidth, totalFrozenColumnWidth = _f.totalFrozenColumnWidth, groupBy = _f.groupBy;
    var _g = __read(react_1.useMemo(function () {
        // get the viewport's left side and right side positions for non-frozen columns
        var viewportLeft = scrollLeft + totalFrozenColumnWidth;
        var viewportRight = scrollLeft + viewportWidth;
        // get first and last non-frozen column indexes
        var lastColIdx = columns.length - 1;
        var firstUnfrozenColumnIdx = Math.min(lastFrozenColumnIndex + 1, lastColIdx);
        // skip rendering non-frozen columns if the frozen columns cover the entire viewport
        if (viewportLeft >= viewportRight) {
            return [firstUnfrozenColumnIdx, firstUnfrozenColumnIdx];
        }
        // get the first visible non-frozen column index
        var colVisibleStartIdx = firstUnfrozenColumnIdx;
        while (colVisibleStartIdx < lastColIdx) {
            var _a = columns[colVisibleStartIdx], left = _a.left, width = _a.width;
            // if the right side of the columnn is beyond the left side of the available viewport,
            // then it is the first column that's at least partially visible
            if (left + width > viewportLeft) {
                break;
            }
            colVisibleStartIdx++;
        }
        // get the last visible non-frozen column index
        var colVisibleEndIdx = colVisibleStartIdx;
        while (colVisibleEndIdx < lastColIdx) {
            var _b = columns[colVisibleEndIdx], left = _b.left, width = _b.width;
            // if the right side of the column is beyond or equal to the right side of the available viewport,
            // then it the last column that's at least partially visible, as the previous column's right side is not beyond the viewport.
            if (left + width >= viewportRight) {
                break;
            }
            colVisibleEndIdx++;
        }
        var colOverscanStartIdx = Math.max(firstUnfrozenColumnIdx, colVisibleStartIdx - 1);
        var colOverscanEndIdx = Math.min(lastColIdx, colVisibleEndIdx + 1);
        return [colOverscanStartIdx, colOverscanEndIdx];
    }, [columns, lastFrozenColumnIndex, scrollLeft, totalFrozenColumnWidth, viewportWidth]), 2), colOverscanStartIdx = _g[0], colOverscanEndIdx = _g[1];
    var viewportColumns = react_1.useMemo(function () {
        var viewportColumns = [];
        for (var colIdx = 0; colIdx <= colOverscanEndIdx; colIdx++) {
            var column = columns[colIdx];
            if (colIdx < colOverscanStartIdx && !column.frozen)
                continue;
            viewportColumns.push(column);
        }
        return viewportColumns;
    }, [colOverscanEndIdx, colOverscanStartIdx, columns]);
    return { columns: columns, viewportColumns: viewportColumns, totalColumnWidth: totalColumnWidth, lastFrozenColumnIndex: lastFrozenColumnIndex, totalFrozenColumnWidth: totalFrozenColumnWidth, groupBy: groupBy };
}
exports.useViewportColumns = useViewportColumns;
//# sourceMappingURL=useViewportColumns.js.map