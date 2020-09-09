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
var react_1 = require("react");
var clsx_1 = require("clsx");
var hooks_1 = require("../hooks");
var SimpleTextEditor_1 = require("./SimpleTextEditor");
var utils_1 = require("../utils");
function EditorContainer(_a) {
    var rowIdx = _a.rowIdx, column = _a.column, row = _a.row, rowHeight = _a.rowHeight, left = _a.left, top = _a.top, onCommit = _a.onCommit, onCommitCancel = _a.onCommitCancel, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop, key = _a.firstEditorKeyPress;
    var editorRef = react_1.useRef(null);
    var changeCommitted = react_1.useRef(false);
    var changeCanceled = react_1.useRef(false);
    var _b = __read(react_1.useState(true), 2), isValid = _b[0], setValid = _b[1];
    var prevScrollLeft = react_1.useRef(scrollLeft);
    var prevScrollTop = react_1.useRef(scrollTop);
    var isUnmounting = react_1.useRef(false);
    var onClickCapture = hooks_1.useClickOutside(commit);
    var getInputNode = react_1.useCallback(function () { var _a; return (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.getInputNode(); }, []);
    var commitCancel = react_1.useCallback(function () {
        changeCanceled.current = true;
        onCommitCancel();
    }, [onCommitCancel]);
    react_1.useLayoutEffect(function () {
        var inputNode = getInputNode();
        if (inputNode instanceof HTMLElement) {
            inputNode.focus();
        }
        if (inputNode instanceof HTMLInputElement) {
            inputNode.select();
        }
    }, [getInputNode]);
    // close editor when scrolling
    react_1.useEffect(function () {
        if (scrollLeft !== prevScrollLeft.current || scrollTop !== prevScrollTop.current) {
            commitCancel();
        }
    }, [commitCancel, scrollLeft, scrollTop]);
    react_1.useEffect(function () { return function () {
        isUnmounting.current = true;
    }; }, []);
    // commit changes when editor is closed
    react_1.useEffect(function () { return function () {
        if (isUnmounting.current && !changeCommitted.current && !changeCanceled.current) {
            commit();
        }
    }; });
    function getInitialValue() {
        var value = row[column.key];
        if (key === 'Delete' || key === 'Backspace') {
            return '';
        }
        if (key === 'Enter' || key === 'F2') {
            return value;
        }
        return key || value;
    }
    function isCaretAtBeginningOfInput() {
        var inputNode = getInputNode();
        return inputNode instanceof HTMLInputElement
            && inputNode.selectionEnd === 0;
    }
    function isCaretAtEndOfInput() {
        var inputNode = getInputNode();
        return inputNode instanceof HTMLInputElement
            && inputNode.selectionStart === inputNode.value.length;
    }
    function editorHasResults() {
        var _a, _b, _c;
        return (_c = (_b = (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.hasResults) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : false;
    }
    function editorIsSelectOpen() {
        var _a, _b, _c;
        return (_c = (_b = (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.isSelectOpen) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : false;
    }
    function isNewValueValid(value) {
        var _a, _b;
        var isValid = (_b = (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.validate) === null || _b === void 0 ? void 0 : _b.call(_a, value);
        if (typeof isValid === 'boolean') {
            setValid(isValid);
            return isValid;
        }
        return true;
    }
    function preventDefaultNavigation(key) {
        return (key === 'ArrowLeft' && !isCaretAtBeginningOfInput())
            || (key === 'ArrowRight' && !isCaretAtEndOfInput())
            || (key === 'Escape' && editorIsSelectOpen())
            || (['ArrowUp', 'ArrowDown'].includes(key) && editorHasResults());
    }
    function commit() {
        if (!editorRef.current)
            return;
        var updated = editorRef.current.getValue();
        if (isNewValueValid(updated)) {
            changeCommitted.current = true;
            var cellKey = column.key;
            onCommit({ cellKey: cellKey, rowIdx: rowIdx, updated: updated });
        }
    }
    function onKeyDown(e) {
        if (preventDefaultNavigation(e.key)) {
            e.stopPropagation();
        }
        else if (['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            commit();
        }
        else if (e.key === 'Escape') {
            commitCancel();
        }
    }
    function createEditor() {
        // return custom column editor or SimpleEditor if none specified
        if (column.editor) {
            return (react_1.default.createElement(column.editor, { ref: editorRef, column: column, value: getInitialValue(), row: row, height: rowHeight, onCommit: commit, onCommitCancel: commitCancel, onOverrideKeyDown: onKeyDown }));
        }
        return (react_1.default.createElement(SimpleTextEditor_1.default, { ref: editorRef, column: column, value: getInitialValue(), onCommit: commit }));
    }
    var className = clsx_1.default('rdg-editor-container', {
        'rdg-editor-invalid': !isValid
    });
    return (react_1.default.createElement("div", { className: className, style: { height: rowHeight, width: column.width, left: left, top: top }, onClickCapture: onClickCapture, onKeyDown: onKeyDown, onContextMenu: utils_1.preventDefault }, createEditor()));
}
exports.default = EditorContainer;
//# sourceMappingURL=EditorContainer.js.map