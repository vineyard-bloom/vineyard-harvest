"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vineyard_lawn_1 = require("vineyard-lawn");
var query = require("./query");
function initialize(bushel) {
    var base_url = bushel.base_url || '';
    vineyard_lawn_1.createEndpoints(bushel.app, [
        {
            method: vineyard_lawn_1.Method.post,
            path: base_url + "/update",
            action: function (request) {
                return Promise.resolve();
            }
        },
        {
            method: vineyard_lawn_1.Method.post,
            path: base_url + "/query",
            action: function (request) {
                return query.execute(request.data, bushel.modeler.collections);
            }
        }
    ]);
}
exports.initialize = initialize;
//# sourceMappingURL=service.js.map