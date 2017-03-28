"use strict";
var lawn = require('vineyard-lawn');
var vineyard_lawn_1 = require('vineyard-lawn');
var query = require('./query');
var scheming = require('./scheming');
exports.scheming = scheming;
var apply_schema_1 = require("./apply_schema");
function initialize(bushel, base_url) {
    if (base_url === void 0) { base_url = ''; }
    // const definitions = scheming.get_definitions(bushel.schema)
    // const models = vineyard_mongoose.define_schema(definitions)
    apply_schema_1.apply_schema(bushel.schema, bushel.db);
    var schema = bushel.schema;
    lawn.create_endpoints(bushel.app, [
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
                return query.execute(request.data, schema.trellises);
            }
        }
    ]);
}
exports.initialize = initialize;
//# sourceMappingURL=index.js.map