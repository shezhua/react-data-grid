"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFocusRef = void 0;
var react_1 = require("react");
function useFocusRef(isCellSelected) {
    var ref = react_1.useRef(null);
    react_1.useLayoutEffect(function () {
        var _a;
        if (!isCellSelected)
            return;
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
    }, [isCellSelected]);
    return ref;
}
exports.useFocusRef = useFocusRef;
//# sourceMappingURL=useFocusRef.js.map