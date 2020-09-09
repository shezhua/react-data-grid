"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapEvent = exports.stopPropagation = exports.preventDefault = void 0;
function preventDefault(event) {
    event.preventDefault();
}
exports.preventDefault = preventDefault;
function stopPropagation(event) {
    event.stopPropagation();
}
exports.stopPropagation = stopPropagation;
function wrapEvent(ourHandler, theirHandler) {
    if (theirHandler === undefined)
        return ourHandler;
    return function (event) {
        ourHandler(event);
        theirHandler(event);
    };
}
exports.wrapEvent = wrapEvent;
//# sourceMappingURL=domUtils.js.map