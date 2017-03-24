"use strict";
var scheming_1 = require("./scheming");
var Sequelize = require('sequelize');
function get_field(property, library) {
    var type = property.type;
    if (type.get_category() == scheming_1.Type_Category.primitive) {
        if (type === library.types.Int)
            return Sequelize.INTEGER;
        if (type === library.types.String)
            return Sequelize.STRING;
    }
    throw Error("Not implemented or supported");
}
function apply_schema(schema, library, sequelize) {
    for (var name_1 in schema.trellises) {
        var trellis = schema.trellises[name_1];
        var fields = {};
        for (var i in trellis.properties) {
            fields[i] = get_field(trellis.properties[i], library);
        }
        var model = sequelize.define(trellis.name, fields);
    }
    for (var name_2 in schema.trellises) {
        var trellis = schema.trellises[name_2];
    }
}
exports.apply_schema = apply_schema;
//# sourceMappingURL=apply_schema.js.map