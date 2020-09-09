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
exports.useGridDimensions = void 0;
var react_1 = require("react");
function useGridDimensions() {
    var gridRef = react_1.useRef(null);
    var _a = __read(react_1.useState(1), 2), gridWidth = _a[0], setGridWidth = _a[1];
    var _b = __read(react_1.useState(1), 2), gridHeight = _b[0], setGridHeight = _b[1];
    react_1.useLayoutEffect(function () {
        var ResizeObserver = window.ResizeObserver;
        // don't break in jest/jsdom and browsers that don't support ResizeObserver
        if (ResizeObserver == null)
            return;
        var resizeObserver = new ResizeObserver(function (entries) {
            var _a = entries[0].contentRect, width = _a.width, height = _a.height;
            setGridWidth(width);
            setGridHeight(height);
        });
        resizeObserver.observe(gridRef.current);
        return function () {
            resizeObserver.disconnect();
        };
    }, []);
    return [gridRef, gridWidth, gridHeight];
}
exports.useGridDimensions = useGridDimensions;
//# sourceMappingURL=useGridDimensions.js.map