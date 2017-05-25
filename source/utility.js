"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function promiseEach(items, action) {
    if (items.length == 0)
        return Promise.resolve();
    var result = action(items[0]);
    var _loop_1 = function (i) {
        result = result
            .then(function () { return action(items[i]); });
    };
    for (var i = 1; i < items.length; ++i) {
        _loop_1(i);
    }
    return result;
}
exports.promiseEach = promiseEach;
//# sourceMappingURL=utility.js.map