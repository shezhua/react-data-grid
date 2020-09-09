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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useViewportRows = void 0;
var react_1 = require("react");
var RENDER_BACTCH_SIZE = 8;
function useViewportRows(_a) {
    var rawRows = _a.rawRows, rowHeight = _a.rowHeight, clientHeight = _a.clientHeight, scrollTop = _a.scrollTop, groupBy = _a.groupBy, rowGrouper = _a.rowGrouper, expandedGroupIds = _a.expandedGroupIds;
    var _b = __read(react_1.useMemo(function () {
        if (groupBy.length === 0 || !rowGrouper)
            return [undefined, rawRows.length];
        var groupRows = function (rows, _a, startRowIndex) {
            var e_1, _b;
            var _c = __read(_a), groupByKey = _c[0], remainingGroupByKeys = _c.slice(1);
            var groupRowsCount = 0;
            var groups = {};
            try {
                for (var _d = __values(Object.entries(rowGrouper(rows, groupByKey))), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var _f = __read(_e.value, 2), key = _f[0], childRows = _f[1];
                    // Recursively group each parent group
                    var _g = __read(remainingGroupByKeys.length === 0
                        ? [childRows, childRows.length]
                        : groupRows(childRows, remainingGroupByKeys, startRowIndex + groupRowsCount + 1), 2), childGroups = _g[0], childRowsCount = _g[1]; // 1 for parent row
                    groups[key] = { childRows: childRows, childGroups: childGroups, startRowIndex: startRowIndex + groupRowsCount };
                    groupRowsCount += childRowsCount + 1; // 1 for parent row
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return [groups, groupRowsCount];
        };
        return groupRows(rawRows, groupBy, 0);
    }, [groupBy, rowGrouper, rawRows]), 2), groupedRows = _b[0], rowsCount = _b[1];
    var _c = __read(react_1.useMemo(function () {
        var allGroupRows = new Set();
        if (!groupedRows)
            return [rawRows, allGroupRows];
        var flattenedRows = [];
        var expandGroup = function (rows, parentId, level) {
            if (Array.isArray(rows)) {
                flattenedRows.push.apply(flattenedRows, __spread(rows));
                return;
            }
            Object.keys(rows).forEach(function (groupKey, posInSet, keys) {
                var _a;
                // TODO: should users have control over the generated key?
                var id = parentId !== undefined ? parentId + "__" + groupKey : groupKey;
                var isExpanded = (_a = expandedGroupIds === null || expandedGroupIds === void 0 ? void 0 : expandedGroupIds.has(id)) !== null && _a !== void 0 ? _a : false;
                var _b = rows[groupKey], childRows = _b.childRows, childGroups = _b.childGroups, startRowIndex = _b.startRowIndex; // https://github.com/microsoft/TypeScript/issues/17002
                var groupRow = {
                    id: id,
                    parentId: parentId,
                    groupKey: groupKey,
                    isExpanded: isExpanded,
                    childRows: childRows,
                    level: level,
                    posInSet: posInSet,
                    startRowIndex: startRowIndex,
                    setSize: keys.length
                };
                flattenedRows.push(groupRow);
                allGroupRows.add(groupRow);
                if (isExpanded) {
                    expandGroup(childGroups, id, level + 1);
                }
            });
        };
        expandGroup(groupedRows, undefined, 0);
        return [flattenedRows, allGroupRows];
    }, [expandedGroupIds, groupedRows, rawRows]), 2), rows = _c[0], allGroupRows = _c[1];
    var isGroupRow = function (row) { return allGroupRows.has(row); };
    var overscanThreshold = 4;
    var rowVisibleStartIdx = Math.floor(scrollTop / rowHeight);
    var rowVisibleEndIdx = Math.min(rows.length - 1, Math.floor((scrollTop + clientHeight) / rowHeight));
    var rowOverscanStartIdx = Math.max(0, Math.floor((rowVisibleStartIdx - overscanThreshold) / RENDER_BACTCH_SIZE) * RENDER_BACTCH_SIZE);
    var rowOverscanEndIdx = Math.min(rows.length - 1, Math.ceil((rowVisibleEndIdx + overscanThreshold) / RENDER_BACTCH_SIZE) * RENDER_BACTCH_SIZE);
    return {
        rowOverscanStartIdx: rowOverscanStartIdx,
        rowOverscanEndIdx: rowOverscanEndIdx,
        rows: rows,
        rowsCount: rowsCount,
        isGroupRow: isGroupRow
    };
}
exports.useViewportRows = useViewportRows;
//# sourceMappingURL=useViewportRows.js.map