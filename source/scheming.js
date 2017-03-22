"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (Category) {
    Category[Category["primitive"] = 0] = "primitive";
    Category[Category["list"] = 1] = "list";
    Category[Category["trellis"] = 2] = "trellis";
})(exports.Category || (exports.Category = {}));
var Category = exports.Category;
var Type = (function () {
    function Type(name) {
        this.name = name;
    }
    return Type;
}());
exports.Type = Type;
var Primitive = (function (_super) {
    __extends(Primitive, _super);
    function Primitive(name, db_type) {
        _super.call(this, name);
        this.db_type = db_type;
    }
    Primitive.prototype.get_category = function () {
        return Category.primitive;
    };
    return Primitive;
}(Type));
exports.Primitive = Primitive;
var Trellis_Type = (function (_super) {
    __extends(Trellis_Type, _super);
    function Trellis_Type() {
        _super.apply(this, arguments);
    }
    Trellis_Type.prototype.get_category = function () {
        return Category.trellis;
    };
    return Trellis_Type;
}(Type));
exports.Trellis_Type = Trellis_Type;
var List_Type = (function (_super) {
    __extends(List_Type, _super);
    function List_Type() {
        _super.apply(this, arguments);
    }
    List_Type.prototype.get_category = function () {
        return Category.list;
    };
    return List_Type;
}(Type));
exports.List_Type = List_Type;
var Property = (function () {
    function Property(name, type, trellis) {
        this.name = name;
        this.type = type;
        this.trellis = trellis;
    }
    Property.prototype.get_path = function () {
        return this.trellis.name + '.' + this.name;
    };
    return Property;
}());
exports.Property = Property;
var Reference = (function (_super) {
    __extends(Reference, _super);
    function Reference() {
        _super.apply(this, arguments);
    }
    return Reference;
}(Property));
exports.Reference = Reference;
var List = (function (_super) {
    __extends(List, _super);
    function List() {
        _super.apply(this, arguments);
    }
    return List;
}(Property));
exports.List = List;
var Trellis = (function () {
    function Trellis(name) {
        this.properties = {};
        this.name = name;
    }
    return Trellis;
}());
exports.Trellis = Trellis;
var Loader = (function () {
    function Loader() {
        this.incomplete = {};
        this.types = {
            String: new Primitive('String', String),
            Number: new Primitive('Number', Number),
        };
    }
    return Loader;
}());
function load_type(source, loader) {
    if (source === String)
        return loader.types.String;
    if (source === Number)
        return loader.types.Number;
    throw Error("Not supported");
}
function load_property(name, source, trellis, loader) {
    var type = load_type(source, loader);
    return new Property(name, type, trellis);
}
function load_trellis(name, source, loader) {
    var trellis = new Trellis(name);
    for (var name_1 in source) {
        trellis.properties[name_1] = load_property(name_1, source[name_1], trellis, loader);
    }
    return trellis;
}
function define(schema, definitions) {
    var loader = new Loader();
    for (var name_2 in definitions) {
        var definition = definitions[name_2];
        schema.trellises[name_2] = load_trellis(name_2, definition, loader);
    }
}
exports.define = define;
function get_definitions(schema) {
}
exports.get_definitions = get_definitions;
//# sourceMappingURL=scheming.js.map