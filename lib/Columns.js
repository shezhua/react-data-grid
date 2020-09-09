"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectColumn = exports.SELECT_COLUMN_KEY = void 0;
var react_1 = require("react");
var formatters_1 = require("./formatters");
var utils_1 = require("./utils");
exports.SELECT_COLUMN_KEY = 'select-row';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.SelectColumn = {
    key: exports.SELECT_COLUMN_KEY,
    name: '',
    width: 35,
    maxWidth: 35,
    resizable: false,
    sortable: false,
    frozen: true,
    headerRenderer: function (props) {
        return (react_1.default.createElement(formatters_1.SelectCellFormatter, { "aria-label": "Select All", value: props.allRowsSelected, onChange: props.onAllRowsSelectionChange }));
    },
    formatter: function (props) {
        return (react_1.default.createElement(formatters_1.SelectCellFormatter, { "aria-label": "Select", tabIndex: -1, isCellSelected: props.isCellSelected, value: props.isRowSelected, onClick: utils_1.stopPropagation, onChange: props.onRowSelectionChange }));
    },
    groupFormatter: function (props) {
        return (react_1.default.createElement(formatters_1.SelectCellFormatter, { "aria-label": "Select Group", tabIndex: -1, isCellSelected: props.isCellSelected, value: props.isRowSelected, onChange: props.onRowSelectionChange, 
            // Stop propagation to prevent row selection
            onClick: utils_1.stopPropagation }));
    }
};
//# sourceMappingURL=Columns.js.map