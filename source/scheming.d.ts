export declare enum Type_Category {
    primitive = 0,
    list = 1,
    trellis = 2,
}
export declare abstract class Type {
    name: string;
    constructor(name: string);
    abstract get_category(): Type_Category;
}
export declare class Primitive extends Type {
    constructor(name: string);
    get_category(): Type_Category;
}
export declare class Trellis_Type extends Type {
    trellis: Trellis;
    get_category(): Type_Category;
}
export declare class List_Type extends Type {
    child_type: Type;
    get_category(): Type_Category;
}
export declare class Property {
    name: string;
    type: Type;
    trellis: Trellis;
    constructor(name: string, type: Type, trellis: Trellis);
    get_path(): string;
}
export declare class Reference extends Property {
    other_property: Property;
    other_trellis: Trellis;
}
export declare class List extends Property {
    other_property: Property;
    other_trellis: Trellis;
}
export declare class Trellis {
    name: string;
    properties: {
        [name: string]: Property;
    };
    constructor(name: string);
}
export interface Schema {
    trellises: {
        [name: string]: Trellis;
    };
}
export declare class Library {
    types: any;
    constructor();
}
export declare function define(schema: Schema, definitions: any): Library;
