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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumnScrollPosition = exports.canEdit = exports.getColumnMetrics = void 0;
var formatters_1 = require("../formatters");
var Columns_1 = require("../Columns");
function getColumnMetrics(metrics) {
    var left = 0;
    var totalWidth = 0;
    var allocatedWidths = 0;
    var unassignedColumnsCount = 0;
    var lastFrozenColumnIndex = -1;
    var totalFrozenColumnWidth = 0;
    var rawGroupBy = metrics.rawGroupBy;
    var columns = metrics.rawColumns.map(function (metricsColumn) {
        var width = getSpecifiedWidth(metricsColumn, metrics.columnWidths, metrics.viewportWidth);
        if (width === undefined) {
            unassignedColumnsCount++;
        }
        else {
            width = clampColumnWidth(width, metricsColumn, metrics.minColumnWidth);
            allocatedWidths += width;
        }
        var column = __assign(__assign({}, metricsColumn), { width: width });
        if (rawGroupBy === null || rawGroupBy === void 0 ? void 0 : rawGroupBy.includes(column.key)) {
            column.frozen = true;
            column.rowGroup = true;
        }
        if (column.frozen) {
            lastFrozenColumnIndex++;
        }
        return column;
    });
    columns.sort(function (_a, _b) {
        var aKey = _a.key, frozenA = _a.frozen;
        var bKey = _b.key, frozenB = _b.frozen;
        // Sort select column first:
        if (aKey === Columns_1.SELECT_COLUMN_KEY)
            return -1;
        if (bKey === Columns_1.SELECT_COLUMN_KEY)
            return 1;
        // Sort grouped columns second, following the groupBy order:
        if (rawGroupBy === null || rawGroupBy === void 0 ? void 0 : rawGroupBy.includes(aKey)) {
            if (rawGroupBy.includes(bKey)) {
                return rawGroupBy.indexOf(aKey) - rawGroupBy.indexOf(bKey);
            }
            return -1;
        }
        if (rawGroupBy === null || rawGroupBy === void 0 ? void 0 : rawGroupBy.includes(bKey))
            return 1;
        // Sort frozen columns third:
        if (frozenA) {
            if (frozenB)
                return 0;
            return -1;
        }
        if (frozenB)
            return 1;
        // Sort other columns last:
        return 0;
    });
    var unallocatedWidth = metrics.viewportWidth - allocatedWidths;
    var unallocatedColumnWidth = Math.max(Math.floor(unallocatedWidth / unassignedColumnsCount), metrics.minColumnWidth);
    // Filter rawGroupBy and ignore keys that do not match the columns prop
    var groupBy = [];
    var calculatedColumns = columns.map(function (column, idx) {
        var _a, _b, _c, _d, _e;
        // Every column should have a valid width as this stage
        var width = (_a = column.width) !== null && _a !== void 0 ? _a : clampColumnWidth(unallocatedColumnWidth, column, metrics.minColumnWidth);
        var newColumn = __assign(__assign({}, column), { idx: idx,
            width: width,
            left: left, sortable: (_b = column.sortable) !== null && _b !== void 0 ? _b : metrics.defaultSortable, resizable: (_c = column.resizable) !== null && _c !== void 0 ? _c : metrics.defaultResizable, formatter: (_d = column.formatter) !== null && _d !== void 0 ? _d : metrics.defaultFormatter });
        if (newColumn.rowGroup) {
            groupBy.push(column.key);
            newColumn.groupFormatter = (_e = column.groupFormatter) !== null && _e !== void 0 ? _e : formatters_1.ToggleGroupFormatter;
        }
        totalWidth += width;
        left += width;
        return newColumn;
    });
    if (lastFrozenColumnIndex !== -1) {
        var lastFrozenColumn = calculatedColumns[lastFrozenColumnIndex];
        lastFrozenColumn.isLastFrozenColumn = true;
        totalFrozenColumnWidth = lastFrozenColumn.left + lastFrozenColumn.width;
    }
    return {
        columns: calculatedColumns,
        lastFrozenColumnIndex: lastFrozenColumnIndex,
        totalFrozenColumnWidth: totalFrozenColumnWidth,
        totalColumnWidth: totalWidth,
        groupBy: groupBy
    };
}
exports.getColumnMetrics = getColumnMetrics;
function getSpecifiedWidth(_a, columnWidths, viewportWidth) {
    var key = _a.key, width = _a.width;
    if (columnWidths.has(key)) {
        // Use the resized width if available
        return columnWidths.get(key);
    }
    if (typeof width === 'number') {
        return width;
    }
    if (typeof width === 'string' && /^\d+%$/.test(width)) {
        return Math.floor(viewportWidth * parseInt(width, 10) / 100);
    }
    return undefined;
}
function clampColumnWidth(width, _a, minColumnWidth) {
    var minWidth = _a.minWidth, maxWidth = _a.maxWidth;
    width = Math.max(width, minWidth !== null && minWidth !== void 0 ? minWidth : minColumnWidth);
    if (typeof maxWidth === 'number') {
        return Math.min(width, maxWidth);
    }
    return width;
}
// Logic extented to allow for functions to be passed down in column.editable
// this allows us to decide whether we can be editing from a cell level
function canEdit(column, row) {
    if (typeof column.editable === 'function') {
        return column.editable(row);
    }
    return Boolean(column.editor || column.editor2 || column.editable);
}
exports.canEdit = canEdit;
function getColumnScrollPosition(columns, idx, currentScrollLeft, currentClientWidth) {
    var left = 0;
    var frozen = 0;
    for (var i = 0; i < idx; i++) {
        var column = columns[i];
        if (column) {
            if (column.width) {
                left += column.width;
            }
            if (column.frozen) {
                frozen += column.width;
            }
        }
    }
    var selectedColumn = columns[idx];
    if (selectedColumn) {
        var scrollLeft = left - frozen - currentScrollLeft;
        var scrollRight = left + selectedColumn.width - currentScrollLeft;
        if (scrollLeft < 0) {
            return scrollLeft;
        }
        if (scrollRight > currentClientWidth) {
            return scrollRight - currentClientWidth;
        }
    }
    return 0;
}
exports.getColumnScrollPosition = getColumnScrollPosition;
//# sourceMappingURL=columnUtils.js.map