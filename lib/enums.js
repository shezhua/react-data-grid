"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateActions = exports.CellNavigationMode = void 0;
var CellNavigationMode;
(function (CellNavigationMode) {
    CellNavigationMode["NONE"] = "none";
    CellNavigationMode["CHANGE_ROW"] = "changeRow";
    CellNavigationMode["LOOP_OVER_ROW"] = "loopOverRow";
})(CellNavigationMode = exports.CellNavigationMode || (exports.CellNavigationMode = {}));
var UpdateActions;
(function (UpdateActions) {
    UpdateActions["CELL_UPDATE"] = "CELL_UPDATE";
    UpdateActions["COLUMN_FILL"] = "COLUMN_FILL";
    UpdateActions["COPY_PASTE"] = "COPY_PASTE";
    UpdateActions["CELL_DRAG"] = "CELL_DRAG";
})(UpdateActions = exports.UpdateActions || (exports.UpdateActions = {}));
//# sourceMappingURL=enums.js.map