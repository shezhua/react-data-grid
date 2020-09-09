"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefaultCellInput = exports.isCtrlKeyHeldDown = exports.isKeyPrintable = void 0;
function isKeyPrintable(keycode) {
    return (keycode > 47 && keycode < 58) // number keys
        || keycode === 32 || keycode === 13 // spacebar & return key(s) (if you want to allow carriage returns)
        || (keycode > 64 && keycode < 91) // letter keys
        || (keycode > 95 && keycode < 112) // numpad keys
        || (keycode > 185 && keycode < 193) // ;=,-./` (in order)
        || (keycode > 218 && keycode < 223); // [\]' (in order)
}
exports.isKeyPrintable = isKeyPrintable;
function isCtrlKeyHeldDown(e) {
    return (e.ctrlKey === true || e.metaKey === true) && e.key !== 'Control';
}
exports.isCtrlKeyHeldDown = isCtrlKeyHeldDown;
function isDefaultCellInput(event) {
    return isKeyPrintable(event.keyCode) || ['Enter', 'F2', 'Backspace', 'Delete'].includes(event.key);
}
exports.isDefaultCellInput = isDefaultCellInput;
//# sourceMappingURL=keyboardUtils.js.map