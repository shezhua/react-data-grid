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
var react_1 = require("react");
var clsx_1 = require("clsx");
var hooks_1 = require("./hooks");
var EventBus_1 = require("./EventBus");
var HeaderRow_1 = require("./HeaderRow");
var FilterRow_1 = require("./FilterRow");
var Row_1 = require("./Row");
var GroupRow_1 = require("./GroupRow");
var SummaryRow_1 = require("./SummaryRow");
var utils_1 = require("./utils");
var enums_1 = require("./enums");
/**
 * Main API Component to render a data grid of rows and columns
 *
 * @example
 *
 * <DataGrid columns={columns} rows={rows} />
*/
function DataGrid(_a, ref) {
    var _b;
    var 
    // Grid and data Props
    rawColumns = _a.columns, rawRows = _a.rows, summaryRows = _a.summaryRows, rowKey = _a.rowKey, onRowsUpdate = _a.onRowsUpdate, onRowsChange = _a.onRowsChange, 
    // Dimensions props
    _c = _a.rowHeight, 
    // Dimensions props
    rowHeight = _c === void 0 ? 35 : _c, _d = _a.headerRowHeight, headerRowHeight = _d === void 0 ? rowHeight : _d, _e = _a.headerFiltersHeight, headerFiltersHeight = _e === void 0 ? 45 : _e, 
    // Feature props
    selectedRows = _a.selectedRows, onSelectedRowsChange = _a.onSelectedRowsChange, sortColumn = _a.sortColumn, sortDirection = _a.sortDirection, onSort = _a.onSort, filters = _a.filters, onFiltersChange = _a.onFiltersChange, defaultColumnOptions = _a.defaultColumnOptions, rawGroupBy = _a.groupBy, rowGrouper = _a.rowGrouper, expandedGroupIds = _a.expandedGroupIds, onExpandedGroupIdsChange = _a.onExpandedGroupIdsChange, 
    // Custom renderers
    _f = _a.rowRenderer, 
    // Custom renderers
    RowRenderer = _f === void 0 ? Row_1.default : _f, emptyRowsRenderer = _a.emptyRowsRenderer, 
    // Event props
    onRowClick = _a.onRowClick, onScroll = _a.onScroll, onColumnResize = _a.onColumnResize, onSelectedCellChange = _a.onSelectedCellChange, onCheckCellIsEditable = _a.onCheckCellIsEditable, 
    // Toggles and modes
    _g = _a.enableFilters, 
    // Toggles and modes
    enableFilters = _g === void 0 ? false : _g, _h = _a.enableCellCopyPaste, enableCellCopyPaste = _h === void 0 ? false : _h, _j = _a.enableCellDragAndDrop, enableCellDragAndDrop = _j === void 0 ? false : _j, _k = _a.cellNavigationMode, cellNavigationMode = _k === void 0 ? enums_1.CellNavigationMode.NONE : _k, 
    // Miscellaneous
    _l = _a.editorPortalTarget, 
    // Miscellaneous
    editorPortalTarget = _l === void 0 ? document.body : _l, className = _a.className, style = _a.style, rowClass = _a.rowClass, 
    // ARIA
    ariaLabel = _a["aria-label"], ariaLabelledBy = _a["aria-labelledby"], ariaDescribedBy = _a["aria-describedby"];
    /**
     * states
     */
    var _m = __read(react_1.useState(function () { return new EventBus_1.default(); }), 1), eventBus = _m[0];
    var _o = __read(react_1.useState(0), 2), scrollTop = _o[0], setScrollTop = _o[1];
    var _p = __read(react_1.useState(0), 2), scrollLeft = _p[0], setScrollLeft = _p[1];
    var _q = __read(react_1.useState(function () { return new Map(); }), 2), columnWidths = _q[0], setColumnWidths = _q[1];
    var _r = __read(react_1.useState({ idx: -1, rowIdx: -1, mode: 'SELECT' }), 2), selectedPosition = _r[0], setSelectedPosition = _r[1];
    var _s = __read(react_1.useState(null), 2), copiedPosition = _s[0], setCopiedPosition = _s[1];
    var _t = __read(react_1.useState(false), 2), isDragging = _t[0], setDragging = _t[1];
    var _u = __read(react_1.useState(undefined), 2), draggedOverRowIdx = _u[0], setOverRowIdx = _u[1];
    var setDraggedOverRowIdx = react_1.useCallback(function (rowIdx) {
        setOverRowIdx(rowIdx);
        latestDraggedOverRowIdx.current = rowIdx;
    }, []);
    /**
     * refs
     */
    var focusSinkRef = react_1.useRef(null);
    var prevSelectedPosition = react_1.useRef(selectedPosition);
    var latestDraggedOverRowIdx = react_1.useRef(draggedOverRowIdx);
    var lastSelectedRowIdx = react_1.useRef(-1);
    var isCellFocusable = react_1.useRef(false);
    /**
     * computed values
     */
    var _v = __read(hooks_1.useGridDimensions(), 3), gridRef = _v[0], gridWidth = _v[1], gridHeight = _v[2];
    var headerRowsCount = enableFilters ? 2 : 1;
    var summaryRowsCount = (_b = summaryRows === null || summaryRows === void 0 ? void 0 : summaryRows.length) !== null && _b !== void 0 ? _b : 0;
    var totalHeaderHeight = headerRowHeight + (enableFilters ? headerFiltersHeight : 0);
    var clientHeight = gridHeight - totalHeaderHeight - summaryRowsCount * rowHeight;
    var isSelectable = selectedRows !== undefined && onSelectedRowsChange !== undefined;
    var _w = hooks_1.useViewportColumns({
        rawColumns: rawColumns,
        columnWidths: columnWidths,
        scrollLeft: scrollLeft,
        viewportWidth: gridWidth,
        defaultColumnOptions: defaultColumnOptions,
        rawGroupBy: rawGroupBy,
        rowGrouper: rowGrouper
    }), columns = _w.columns, viewportColumns = _w.viewportColumns, totalColumnWidth = _w.totalColumnWidth, lastFrozenColumnIndex = _w.lastFrozenColumnIndex, totalFrozenColumnWidth = _w.totalFrozenColumnWidth, groupBy = _w.groupBy;
    var _x = hooks_1.useViewportRows({
        rawRows: rawRows,
        groupBy: groupBy,
        rowGrouper: rowGrouper,
        rowHeight: rowHeight,
        clientHeight: clientHeight,
        scrollTop: scrollTop,
        expandedGroupIds: expandedGroupIds
    }), rowOverscanStartIdx = _x.rowOverscanStartIdx, rowOverscanEndIdx = _x.rowOverscanEndIdx, rows = _x.rows, rowsCount = _x.rowsCount, isGroupRow = _x.isGroupRow;
    var hasGroups = groupBy.length > 0 && rowGrouper;
    var minColIdx = hasGroups ? -1 : 0;
    if (hasGroups) {
        // Cell drag is not supported on a treegrid
        enableCellDragAndDrop = false;
    }
    /**
     * effects
     */
    react_1.useLayoutEffect(function () {
        if (selectedPosition === prevSelectedPosition.current || selectedPosition.mode === 'EDIT' || !isCellWithinBounds(selectedPosition))
            return;
        prevSelectedPosition.current = selectedPosition;
        scrollToCell(selectedPosition);
        if (isCellFocusable.current) {
            isCellFocusable.current = false;
            return;
        }
        focusSinkRef.current.focus();
    });
    react_1.useEffect(function () {
        if (!onSelectedRowsChange)
            return;
        var handleRowSelectionChange = function (_a) {
            var e_1, _b;
            var rowIdx = _a.rowIdx, checked = _a.checked, isShiftClick = _a.isShiftClick;
            utils_1.assertIsValidKey(rowKey);
            var newSelectedRows = new Set(selectedRows);
            var row = rows[rowIdx];
            if (isGroupRow(row)) {
                try {
                    for (var _c = __values(row.childRows), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var childRow = _d.value;
                        if (checked) {
                            newSelectedRows.add(childRow[rowKey]);
                        }
                        else {
                            newSelectedRows.delete(childRow[rowKey]);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                onSelectedRowsChange(newSelectedRows);
                return;
            }
            var rowId = row[rowKey];
            if (checked) {
                newSelectedRows.add(rowId);
                var previousRowIdx = lastSelectedRowIdx.current;
                lastSelectedRowIdx.current = rowIdx;
                if (isShiftClick && previousRowIdx !== -1 && previousRowIdx !== rowIdx) {
                    var step = Math.sign(rowIdx - previousRowIdx);
                    for (var i = previousRowIdx + step; i !== rowIdx; i += step) {
                        var row_1 = rows[i];
                        if (isGroupRow(row_1))
                            continue;
                        newSelectedRows.add(row_1[rowKey]);
                    }
                }
            }
            else {
                newSelectedRows.delete(rowId);
                lastSelectedRowIdx.current = -1;
            }
            onSelectedRowsChange(newSelectedRows);
        };
        return eventBus.subscribe('SELECT_ROW', handleRowSelectionChange);
    }, [eventBus, isGroupRow, onSelectedRowsChange, rowKey, rows, selectedRows]);
    react_1.useEffect(function () {
        return eventBus.subscribe('SELECT_CELL', selectCell);
    });
    react_1.useEffect(function () {
        if (!onExpandedGroupIdsChange)
            return;
        var toggleGroup = function (expandedGroupId) {
            var newExpandedGroupIds = new Set(expandedGroupIds);
            if (newExpandedGroupIds.has(expandedGroupId)) {
                newExpandedGroupIds.delete(expandedGroupId);
            }
            else {
                newExpandedGroupIds.add(expandedGroupId);
            }
            onExpandedGroupIdsChange(newExpandedGroupIds);
        };
        return eventBus.subscribe('TOGGLE_GROUP', toggleGroup);
    }, [eventBus, expandedGroupIds, onExpandedGroupIdsChange]);
    react_1.useImperativeHandle(ref, function () { return ({
        scrollToColumn: function (idx) {
            scrollToCell({ idx: idx });
        },
        scrollToRow: function (rowIdx) {
            var current = gridRef.current;
            if (!current)
                return;
            current.scrollTop = rowIdx * rowHeight;
        },
        selectCell: selectCell
    }); });
    /**
     * event handlers
     */
    function handleKeyDown(event) {
        var key = event.key;
        var row = rows[selectedPosition.rowIdx];
        if (enableCellCopyPaste
            && utils_1.isCtrlKeyHeldDown(event)
            && isCellWithinBounds(selectedPosition)
            && !isGroupRow(row)
            && selectedPosition.idx !== -1) {
            // key may be uppercase `C` or `V`
            var lowerCaseKey = key.toLowerCase();
            if (lowerCaseKey === 'c') {
                handleCopy();
                return;
            }
            if (lowerCaseKey === 'v') {
                handlePaste();
                return;
            }
        }
        if (isCellWithinBounds(selectedPosition)
            && isGroupRow(row)
            && selectedPosition.idx === -1
            && (
            // Collapse the current group row if it is focused and is in expanded state
            (key === 'ArrowLeft' && row.isExpanded)
                // Expand the current group row if it is focused and is in collapsed state
                || (key === 'ArrowRight' && !row.isExpanded))) {
            event.preventDefault(); // Prevents scrolling
            eventBus.dispatch('TOGGLE_GROUP', row.id);
            return;
        }
        switch (event.key) {
            case 'Escape':
                setCopiedPosition(null);
                closeEditor();
                return;
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'Tab':
            case 'Home':
            case 'End':
            case 'PageUp':
            case 'PageDown':
                navigate(event);
                break;
            default:
                handleCellInput(event);
                break;
        }
    }
    function handleFocus() {
        isCellFocusable.current = true;
    }
    function handleScroll(event) {
        var _a = event.currentTarget, scrollTop = _a.scrollTop, scrollLeft = _a.scrollLeft;
        setScrollTop(scrollTop);
        setScrollLeft(scrollLeft);
        onScroll === null || onScroll === void 0 ? void 0 : onScroll(event);
    }
    var handleColumnResize = react_1.useCallback(function (column, width) {
        var newColumnWidths = new Map(columnWidths);
        newColumnWidths.set(column.key, width);
        setColumnWidths(newColumnWidths);
        onColumnResize === null || onColumnResize === void 0 ? void 0 : onColumnResize(column.idx, width);
    }, [columnWidths, onColumnResize]);
    function getRawRowIdx(rowIdx) {
        return hasGroups ? rawRows.indexOf(rows[rowIdx]) : rowIdx;
    }
    function handleCommit(_a) {
        var cellKey = _a.cellKey, rowIdx = _a.rowIdx, updated = _a.updated;
        rowIdx = getRawRowIdx(rowIdx);
        onRowsUpdate === null || onRowsUpdate === void 0 ? void 0 : onRowsUpdate({
            cellKey: cellKey,
            fromRow: rowIdx,
            toRow: rowIdx,
            updated: updated,
            action: enums_1.UpdateActions.CELL_UPDATE
        });
        closeEditor();
    }
    function commitEditor2Changes() {
        var _a;
        if (((_a = columns[selectedPosition.idx]) === null || _a === void 0 ? void 0 : _a.editor2) === undefined
            || selectedPosition.mode === 'SELECT'
            || selectedPosition.row === selectedPosition.originalRow) {
            return;
        }
        var updatedRows = __spread(rawRows);
        updatedRows[getRawRowIdx(selectedPosition.rowIdx)] = selectedPosition.row;
        onRowsChange === null || onRowsChange === void 0 ? void 0 : onRowsChange(updatedRows);
    }
    function handleCopy() {
        var idx = selectedPosition.idx, rowIdx = selectedPosition.rowIdx;
        var rawRowIdx = getRawRowIdx(rowIdx);
        var value = rawRows[rawRowIdx][columns[idx].key];
        setCopiedPosition({ idx: idx, rowIdx: rowIdx, value: value });
    }
    function handlePaste() {
        var _a;
        if (copiedPosition === null
            || !isCellEditable(selectedPosition)
            || (copiedPosition.idx === selectedPosition.idx && copiedPosition.rowIdx === selectedPosition.rowIdx)) {
            return;
        }
        var fromRow = getRawRowIdx(copiedPosition.rowIdx);
        var fromCellKey = columns[copiedPosition.idx].key;
        var toRow = getRawRowIdx(selectedPosition.rowIdx);
        var cellKey = columns[selectedPosition.idx].key;
        onRowsUpdate === null || onRowsUpdate === void 0 ? void 0 : onRowsUpdate({
            cellKey: cellKey,
            fromRow: fromRow,
            toRow: toRow,
            updated: (_a = {}, _a[cellKey] = copiedPosition.value, _a),
            action: enums_1.UpdateActions.COPY_PASTE,
            fromCellKey: fromCellKey
        });
    }
    function handleCellInput(event) {
        var _a, _b;
        if (!isCellWithinBounds(selectedPosition))
            return;
        var row = rows[selectedPosition.rowIdx];
        if (isGroupRow(row))
            return;
        var key = event.key;
        var column = columns[selectedPosition.idx];
        if (selectedPosition.mode === 'EDIT') {
            if (key === 'Enter') {
                // Custom editors can listen for the event and stop propagation to prevent commit
                commitEditor2Changes();
                closeEditor();
            }
            return;
        }
        (_b = (_a = column.editorOptions) === null || _a === void 0 ? void 0 : _a.onCellKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        if (event.isDefaultPrevented())
            return;
        if (isCellEditable(selectedPosition) && utils_1.isDefaultCellInput(event)) {
            setSelectedPosition(function (_a) {
                var idx = _a.idx, rowIdx = _a.rowIdx;
                return ({
                    idx: idx,
                    rowIdx: rowIdx,
                    key: key,
                    mode: 'EDIT',
                    row: row,
                    originalRow: row
                });
            });
        }
    }
    function handleDragEnd() {
        var _a;
        if (latestDraggedOverRowIdx.current === undefined)
            return;
        var idx = selectedPosition.idx, rowIdx = selectedPosition.rowIdx;
        var column = columns[idx];
        var cellKey = column.key;
        var value = rawRows[rowIdx][cellKey];
        onRowsUpdate === null || onRowsUpdate === void 0 ? void 0 : onRowsUpdate({
            cellKey: cellKey,
            fromRow: rowIdx,
            toRow: latestDraggedOverRowIdx.current,
            updated: (_a = {}, _a[cellKey] = value, _a),
            action: enums_1.UpdateActions.CELL_DRAG
        });
        setDraggedOverRowIdx(undefined);
    }
    function handleMouseDown(event) {
        if (event.buttons !== 1)
            return;
        setDragging(true);
        window.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mouseup', onMouseUp);
        function onMouseOver(event) {
            // Trigger onMouseup in edge cases where we release the mouse button but `mouseup` isn't triggered,
            // for example when releasing the mouse button outside the iframe the grid is rendered in.
            // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
            if (event.buttons !== 1)
                onMouseUp();
        }
        function onMouseUp() {
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mouseup', onMouseUp);
            setDragging(false);
            handleDragEnd();
        }
    }
    function handleDoubleClick(event) {
        var _a;
        event.stopPropagation();
        var column = columns[selectedPosition.idx];
        var cellKey = column.key;
        var value = rawRows[selectedPosition.rowIdx][cellKey];
        onRowsUpdate === null || onRowsUpdate === void 0 ? void 0 : onRowsUpdate({
            cellKey: cellKey,
            fromRow: selectedPosition.rowIdx,
            toRow: rawRows.length - 1,
            updated: (_a = {}, _a[cellKey] = value, _a),
            action: enums_1.UpdateActions.COLUMN_FILL
        });
    }
    function handleRowChange(row, commitChanges) {
        if (selectedPosition.mode === 'SELECT')
            return;
        if (commitChanges) {
            var updatedRows = __spread(rawRows);
            updatedRows[getRawRowIdx(selectedPosition.rowIdx)] = row;
            onRowsChange === null || onRowsChange === void 0 ? void 0 : onRowsChange(updatedRows);
            closeEditor();
        }
        else {
            setSelectedPosition(function (position) { return (__assign(__assign({}, position), { row: row })); });
        }
    }
    function handleOnClose(commitChanges) {
        if (commitChanges) {
            commitEditor2Changes();
        }
        closeEditor();
    }
    /**
     * utils
     */
    function isCellWithinBounds(_a) {
        var idx = _a.idx, rowIdx = _a.rowIdx;
        return rowIdx >= 0 && rowIdx < rows.length && idx >= minColIdx && idx < columns.length;
    }
    function isCellEditable(position) {
        return isCellWithinBounds(position)
            && utils_1.isSelectedCellEditable({ columns: columns, rows: rows, selectedPosition: position, onCheckCellIsEditable: onCheckCellIsEditable, isGroupRow: isGroupRow });
    }
    function selectCell(position, enableEditor) {
        if (enableEditor === void 0) { enableEditor = false; }
        if (!isCellWithinBounds(position))
            return;
        commitEditor2Changes();
        if (enableEditor && isCellEditable(position)) {
            var row = rows[position.rowIdx];
            setSelectedPosition(__assign(__assign({}, position), { mode: 'EDIT', key: null, row: row, originalRow: row }));
        }
        else {
            setSelectedPosition(__assign(__assign({}, position), { mode: 'SELECT' }));
        }
        onSelectedCellChange === null || onSelectedCellChange === void 0 ? void 0 : onSelectedCellChange(__assign({}, position));
    }
    function closeEditor() {
        if (selectedPosition.mode === 'SELECT')
            return;
        setSelectedPosition(function (_a) {
            var idx = _a.idx, rowIdx = _a.rowIdx;
            return ({ idx: idx, rowIdx: rowIdx, mode: 'SELECT' });
        });
    }
    function scrollToCell(_a) {
        var idx = _a.idx, rowIdx = _a.rowIdx;
        var current = gridRef.current;
        if (!current)
            return;
        if (typeof idx === 'number' && idx > lastFrozenColumnIndex) {
            var clientWidth = current.clientWidth;
            var _b = columns[idx], left = _b.left, width = _b.width;
            var isCellAtLeftBoundary = left < scrollLeft + width + totalFrozenColumnWidth;
            var isCellAtRightBoundary = left + width > clientWidth + scrollLeft;
            if (isCellAtLeftBoundary || isCellAtRightBoundary) {
                var newScrollLeft = utils_1.getColumnScrollPosition(columns, idx, scrollLeft, clientWidth);
                current.scrollLeft = scrollLeft + newScrollLeft;
            }
        }
        if (typeof rowIdx === 'number') {
            if (rowIdx * rowHeight < scrollTop) {
                // at top boundary, scroll to the row's top
                current.scrollTop = rowIdx * rowHeight;
            }
            else if ((rowIdx + 1) * rowHeight > scrollTop + clientHeight) {
                // at bottom boundary, scroll the next row's top to the bottom of the viewport
                current.scrollTop = (rowIdx + 1) * rowHeight - clientHeight;
            }
        }
    }
    function getNextPosition(key, ctrlKey, shiftKey) {
        var idx = selectedPosition.idx, rowIdx = selectedPosition.rowIdx;
        var row = rows[rowIdx];
        var isRowSelected = isCellWithinBounds(selectedPosition) && idx === -1;
        // If a group row is focused, and it is collapsed, move to the parent group row (if there is one).
        if (key === 'ArrowLeft'
            && isRowSelected
            && isGroupRow(row)
            && !row.isExpanded
            && row.level !== 0) {
            var parentRowIdx = -1;
            for (var i = selectedPosition.rowIdx - 1; i >= 0; i--) {
                var parentRow = rows[i];
                if (isGroupRow(parentRow) && parentRow.id === row.parentId) {
                    parentRowIdx = i;
                    break;
                }
            }
            if (parentRowIdx !== -1) {
                return { idx: idx, rowIdx: parentRowIdx };
            }
        }
        switch (key) {
            case 'ArrowUp':
                return { idx: idx, rowIdx: rowIdx - 1 };
            case 'ArrowDown':
                return { idx: idx, rowIdx: rowIdx + 1 };
            case 'ArrowLeft':
                return { idx: idx - 1, rowIdx: rowIdx };
            case 'ArrowRight':
                return { idx: idx + 1, rowIdx: rowIdx };
            case 'Tab':
                if (selectedPosition.idx === -1 && selectedPosition.rowIdx === -1) {
                    return shiftKey ? { idx: columns.length - 1, rowIdx: rows.length - 1 } : { idx: 0, rowIdx: 0 };
                }
                return { idx: idx + (shiftKey ? -1 : 1), rowIdx: rowIdx };
            case 'Home':
                // If row is selected then move focus to the first row
                if (isRowSelected)
                    return { idx: idx, rowIdx: 0 };
                return ctrlKey ? { idx: 0, rowIdx: 0 } : { idx: 0, rowIdx: rowIdx };
            case 'End':
                // If row is selected then move focus to the last row.
                if (isRowSelected)
                    return { idx: idx, rowIdx: rows.length - 1 };
                return ctrlKey ? { idx: columns.length - 1, rowIdx: rows.length - 1 } : { idx: columns.length - 1, rowIdx: rowIdx };
            case 'PageUp':
                return { idx: idx, rowIdx: rowIdx - Math.floor(clientHeight / rowHeight) };
            case 'PageDown':
                return { idx: idx, rowIdx: rowIdx + Math.floor(clientHeight / rowHeight) };
            default:
                return selectedPosition;
        }
    }
    function navigate(event) {
        var key = event.key, shiftKey = event.shiftKey;
        var ctrlKey = utils_1.isCtrlKeyHeldDown(event);
        var nextPosition = getNextPosition(key, ctrlKey, shiftKey);
        var mode = cellNavigationMode;
        if (key === 'Tab') {
            // If we are in a position to leave the grid, stop editing but stay in that cell
            if (utils_1.canExitGrid({ shiftKey: shiftKey, cellNavigationMode: cellNavigationMode, columns: columns, rowsCount: rows.length, selectedPosition: selectedPosition })) {
                // Allow focus to leave the grid so the next control in the tab order can be focused
                return;
            }
            mode = cellNavigationMode === enums_1.CellNavigationMode.NONE
                ? enums_1.CellNavigationMode.CHANGE_ROW
                : cellNavigationMode;
        }
        // Do not allow focus to leave
        event.preventDefault();
        nextPosition = utils_1.getNextSelectedCellPosition({
            columns: columns,
            rowsCount: rows.length,
            cellNavigationMode: mode,
            nextPosition: nextPosition
        });
        selectCell(nextPosition);
    }
    function getDraggedOverCellIdx(currentRowIdx) {
        if (draggedOverRowIdx === undefined)
            return;
        var rowIdx = selectedPosition.rowIdx;
        var isDraggedOver = rowIdx < draggedOverRowIdx
            ? rowIdx < currentRowIdx && currentRowIdx <= draggedOverRowIdx
            : rowIdx > currentRowIdx && currentRowIdx >= draggedOverRowIdx;
        return isDraggedOver ? selectedPosition.idx : undefined;
    }
    function getSelectedCellProps(rowIdx) {
        if (selectedPosition.rowIdx !== rowIdx)
            return;
        if (selectedPosition.mode === 'EDIT') {
            return {
                mode: 'EDIT',
                idx: selectedPosition.idx,
                onKeyDown: handleKeyDown,
                editorPortalTarget: editorPortalTarget,
                editorContainerProps: {
                    rowHeight: rowHeight,
                    scrollLeft: scrollLeft,
                    scrollTop: scrollTop,
                    firstEditorKeyPress: selectedPosition.key,
                    onCommit: handleCommit,
                    onCommitCancel: closeEditor
                },
                editor2Props: {
                    rowHeight: rowHeight,
                    row: selectedPosition.row,
                    onRowChange: handleRowChange,
                    onClose: handleOnClose
                }
            };
        }
        return {
            mode: 'SELECT',
            idx: selectedPosition.idx,
            onFocus: handleFocus,
            onKeyDown: handleKeyDown,
            dragHandleProps: enableCellDragAndDrop && isCellEditable(selectedPosition)
                ? { onMouseDown: handleMouseDown, onDoubleClick: handleDoubleClick }
                : undefined
        };
    }
    function getViewportRows() {
        var _a;
        var rowElements = [];
        var startRowIndex = 0;
        for (var rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
            var row = rows[rowIdx];
            var top_1 = rowIdx * rowHeight + totalHeaderHeight;
            if (isGroupRow(row)) {
                (startRowIndex = row.startRowIndex);
                rowElements.push(react_1.default.createElement(GroupRow_1.default, { "aria-level": row.level + 1, "aria-setsize": row.setSize, "aria-posinset": row.posInSet + 1, "aria-rowindex": headerRowsCount + startRowIndex + 1, key: row.id, id: row.id, groupKey: row.groupKey, viewportColumns: viewportColumns, childRows: row.childRows, rowIdx: rowIdx, top: top_1, level: row.level, isExpanded: row.isExpanded, selectedCellIdx: selectedPosition.rowIdx === rowIdx ? selectedPosition.idx : undefined, isRowSelected: isSelectable && row.childRows.every(function (cr) { return selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.has(cr[rowKey]); }), eventBus: eventBus, onFocus: selectedPosition.rowIdx === rowIdx ? handleFocus : undefined, onKeyDown: selectedPosition.rowIdx === rowIdx ? handleKeyDown : undefined }));
                continue;
            }
            startRowIndex++;
            var key = hasGroups ? startRowIndex : rowIdx;
            var isRowSelected = false;
            if (rowKey !== undefined) {
                var rowId = row[rowKey];
                isRowSelected = (_a = selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.has(rowId)) !== null && _a !== void 0 ? _a : false;
                if (typeof rowId === 'string' || typeof rowId === 'number') {
                    key = rowId;
                }
            }
            rowElements.push(react_1.default.createElement(RowRenderer, { "aria-rowindex": headerRowsCount + (hasGroups ? startRowIndex : rowIdx) + 1, "aria-selected": isSelectable ? isRowSelected : undefined, key: key, rowIdx: rowIdx, row: row, viewportColumns: viewportColumns, eventBus: eventBus, isRowSelected: isRowSelected, onRowClick: onRowClick, rowClass: rowClass, top: top_1, copiedCellIdx: (copiedPosition === null || copiedPosition === void 0 ? void 0 : copiedPosition.rowIdx) === rowIdx ? copiedPosition.idx : undefined, draggedOverCellIdx: getDraggedOverCellIdx(rowIdx), setDraggedOverRowIdx: isDragging ? setDraggedOverRowIdx : undefined, selectedCellProps: getSelectedCellProps(rowIdx) }));
        }
        return rowElements;
    }
    // Reset the positions if the current values are no longer valid. This can happen if a column or row is removed
    if (selectedPosition.idx >= columns.length || selectedPosition.rowIdx >= rows.length) {
        setSelectedPosition({ idx: -1, rowIdx: -1, mode: 'SELECT' });
        setCopiedPosition(null);
        setDraggedOverRowIdx(undefined);
    }
    if (selectedPosition.mode === 'EDIT' && rows[selectedPosition.rowIdx] !== selectedPosition.originalRow) {
        // Discard changes if rows are updated from outside
        closeEditor();
    }
    return (react_1.default.createElement("div", { role: hasGroups ? 'treegrid' : 'grid', "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, "aria-multiselectable": isSelectable ? true : undefined, "aria-colcount": columns.length, "aria-rowcount": headerRowsCount + rowsCount + summaryRowsCount, className: clsx_1.default('rdg', { 'rdg-viewport-dragging': isDragging }, className), style: __assign(__assign({}, style), { '--header-row-height': headerRowHeight + "px", '--filter-row-height': headerFiltersHeight + "px", '--row-width': totalColumnWidth + "px", '--row-height': rowHeight + "px" }), ref: gridRef, onScroll: handleScroll },
        react_1.default.createElement(HeaderRow_1.default, { rowKey: rowKey, rows: rawRows, columns: viewportColumns, onColumnResize: handleColumnResize, allRowsSelected: (selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.size) === rawRows.length, onSelectedRowsChange: onSelectedRowsChange, sortColumn: sortColumn, sortDirection: sortDirection, onSort: onSort }),
        enableFilters && (react_1.default.createElement(FilterRow_1.default, { columns: viewportColumns, filters: filters, onFiltersChange: onFiltersChange })),
        rows.length === 0 && emptyRowsRenderer ? react_1.createElement(emptyRowsRenderer) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { ref: focusSinkRef, tabIndex: 0, className: "rdg-focus-sink", onKeyDown: handleKeyDown }),
            react_1.default.createElement("div", { style: { height: Math.max(rows.length * rowHeight, clientHeight) } }),
            getViewportRows(), summaryRows === null || summaryRows === void 0 ? void 0 :
            summaryRows.map(function (row, rowIdx) { return (react_1.default.createElement(SummaryRow_1.default, { "aria-rowindex": headerRowsCount + rowsCount + rowIdx + 1, key: rowIdx, rowIdx: rowIdx, row: row, bottom: rowHeight * (summaryRows.length - 1 - rowIdx), viewportColumns: viewportColumns })); })))));
}
exports.default = react_1.forwardRef(DataGrid);
//# sourceMappingURL=DataGrid.js.map