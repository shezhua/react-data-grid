"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCellFormatter = void 0;
var react_1 = require("react");
function SimpleCellFormatter(_a) {
    var row = _a.row, column = _a.column;
    var value = row[column.key];
    return react_1.default.createElement("span", { title: String(value) }, value);
}
exports.SimpleCellFormatter = SimpleCellFormatter;
//# sourceMappingURL=SimpleCellFormatter.js.map