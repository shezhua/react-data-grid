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
exports.canExitGrid = exports.getNextSelectedCellPosition = exports.isSelectedCellEditable = void 0;
var enums_1 = require("../enums");
var columnUtils_1 = require("./columnUtils");
function isSelectedCellEditable(_a) {
    var selectedPosition = _a.selectedPosition, columns = _a.columns, rows = _a.rows, onCheckCellIsEditable = _a.onCheckCellIsEditable, isGroupRow = _a.isGroupRow;
    var column = columns[selectedPosition.idx];
    var row = rows[selectedPosition.rowIdx];
    if (column.rowGroup || isGroupRow(row))
        return false;
    var isCellEditable = onCheckCellIsEditable ? onCheckCellIsEditable(__assign({ row: row, column: column }, selectedPosition)) : true;
    return isCellEditable && columnUtils_1.canEdit(column, row);
}
exports.isSelectedCellEditable = isSelectedCellEditable;
function getNextSelectedCellPosition(_a) {
    var cellNavigationMode = _a.cellNavigationMode, columns = _a.columns, rowsCount = _a.rowsCount, nextPosition = _a.nextPosition;
    if (cellNavigationMode !== enums_1.CellNavigationMode.NONE) {
        var idx = nextPosition.idx, rowIdx = nextPosition.rowIdx;
        var columnsCount = columns.length;
        var isAfterLastColumn = idx === columnsCount;
        var isBeforeFirstColumn = idx === -1;
        if (isAfterLastColumn) {
            if (cellNavigationMode === enums_1.CellNavigationMode.CHANGE_ROW) {
                var isLastRow = rowIdx === rowsCount - 1;
                if (!isLastRow) {
                    return {
                        idx: 0,
                        rowIdx: rowIdx + 1
                    };
                }
            }
            else if (cellNavigationMode === enums_1.CellNavigationMode.LOOP_OVER_ROW) {
                return {
                    rowIdx: rowIdx,
                    idx: 0
                };
            }
        }
        else if (isBeforeFirstColumn) {
            if (cellNavigationMode === enums_1.CellNavigationMode.CHANGE_ROW) {
                var isFirstRow = rowIdx === 0;
                if (!isFirstRow) {
                    return {
                        rowIdx: rowIdx - 1,
                        idx: columnsCount - 1
                    };
                }
            }
            else if (cellNavigationMode === enums_1.CellNavigationMode.LOOP_OVER_ROW) {
                return {
                    rowIdx: rowIdx,
                    idx: columnsCount - 1
                };
            }
        }
    }
    return nextPosition;
}
exports.getNextSelectedCellPosition = getNextSelectedCellPosition;
function canExitGrid(_a) {
    var cellNavigationMode = _a.cellNavigationMode, columns = _a.columns, rowsCount = _a.rowsCount, _b = _a.selectedPosition, rowIdx = _b.rowIdx, idx = _b.idx, shiftKey = _a.shiftKey;
    // When the cellNavigationMode is 'none' or 'changeRow', you can exit the grid if you're at the first or last cell of the grid
    // When the cellNavigationMode is 'loopOverRow', there is no logical exit point so you can't exit the grid
    if (cellNavigationMode === enums_1.CellNavigationMode.NONE || cellNavigationMode === enums_1.CellNavigationMode.CHANGE_ROW) {
        var atLastCellInRow = idx === columns.length - 1;
        var atFirstCellInRow = idx === 0;
        var atLastRow = rowIdx === rowsCount - 1;
        var atFirstRow = rowIdx === 0;
        return shiftKey ? atFirstCellInRow && atFirstRow : atLastCellInRow && atLastRow;
    }
    return false;
}
exports.canExitGrid = canExitGrid;
//# sourceMappingURL=selectedCellUtils.js.map