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
var react_1 = require("react");
var clsx_1 = require("clsx");
function FilterRow(_a) {
    var columns = _a.columns, filters = _a.filters, onFiltersChange = _a.onFiltersChange;
    function onChange(key, value) {
        var newFilters = __assign({}, filters);
        newFilters[key] = value;
        onFiltersChange === null || onFiltersChange === void 0 ? void 0 : onFiltersChange(newFilters);
    }
    return (react_1.default.createElement("div", { role: "row", "aria-rowindex": 2, className: "rdg-filter-row" }, columns.map(function (column) {
        var key = column.key;
        var className = clsx_1.default('rdg-cell', {
            'rdg-cell-frozen': column.frozen,
            'rdg-cell-frozen-last': column.isLastFrozenColumn
        });
        var style = {
            width: column.width,
            left: column.left
        };
        return (react_1.default.createElement("div", { key: key, style: style, className: className }, column.filterRenderer && react_1.createElement(column.filterRenderer, {
            column: column,
            value: filters === null || filters === void 0 ? void 0 : filters[column.key],
            onChange: function (value) { return onChange(key, value); }
        })));
    })));
}
exports.default = react_1.memo(FilterRow);
//# sourceMappingURL=FilterRow.js.map