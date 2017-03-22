"use strict";
var lawn = require('vineyard-lawn');
var vineyard_lawn_1 = require('vineyard-lawn');
var query = require('./query');
var vineyard_mongoose = require('vineyard-mongoose');
var scheming = require('./scheming');
exports.scheming = scheming;
function initialize(bushel, base_url) {
    if (base_url === void 0) { base_url = ''; }
    var definitions = scheming.get_definitions(bushel.schema);
    var models = vineyard_mongoose.define_schema(definitions);
    lawn.initialize_endpoints(bushel.app, [
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
                return query.execute(request, models);
            }
        }
    ]);
}
exports.initialize = initialize;
//# sourceMappingURL=index.js.map