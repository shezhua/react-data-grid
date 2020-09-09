"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapRefs = exports.assertIsValidKey = void 0;
__exportStar(require("./domUtils"), exports);
__exportStar(require("./columnUtils"), exports);
__exportStar(require("./keyboardUtils"), exports);
__exportStar(require("./selectedCellUtils"), exports);
function assertIsValidKey(key) {
    if (key === undefined) {
        throw new Error('Please specify the rowKey prop to use selection');
    }
}
exports.assertIsValidKey = assertIsValidKey;
function wrapRefs() {
    var refs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        refs[_i] = arguments[_i];
    }
    return function (handle) {
        var e_1, _a;
        try {
            for (var refs_1 = __values(refs), refs_1_1 = refs_1.next(); !refs_1_1.done; refs_1_1 = refs_1.next()) {
                var ref = refs_1_1.value;
                if (typeof ref === 'function') {
                    ref(handle);
                }
                else if (ref !== null) {
                    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065
                    // @ts-expect-error
                    ref.current = handle;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (refs_1_1 && !refs_1_1.done && (_a = refs_1.return)) _a.call(refs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
}
exports.wrapRefs = wrapRefs;
//# sourceMappingURL=index.js.map