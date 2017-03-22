export enum Category {
  primitive,
  list,
  trellis
}

export abstract class Type {
  name: string

  constructor(name: string) {
    this.name = name
  }

  abstract get_category(): Category
}

export class Primitive extends Type {
  db_type

  constructor(name: string, db_type) {
    super(name)
    this.db_type = db_type
  }

  get_category(): Category {
    return Category.primitive
  }
}

export class Trellis_Type extends Type {
  trellis: Trellis

  get_category(): Category {
    return Category.trellis
  }
}

export class List_Type extends Type {
  child_type: Type

  get_category(): Category {
    return Category.list
  }
}

export class Property {
  name: string
  type: Type
  trellis: Trellis

  constructor(name: string, type: Type, trellis: Trellis) {
    this.name = name
    this.type = type
    this.trellis = trellis
  }

  get_path(): string {
    return this.trellis.name + '.' + this.name
  }
}

export class Reference extends Property {
  other_property: Property
  other_trellis: Trellis
}

export class List extends Property {
  other_property: Property
  other_trellis: Trellis
}

export class Trellis {
  name: string
  properties: {[name: string]: Property} = {}

  constructor(name: string) {
    this.name = name
  }
}

export interface Schema {
  trellises: {[name: string]: Trellis}
}

class Loader {
  incomplete = {}
  types

  constructor() {
    this.types = {
      String: new Primitive('String', String),
      Number: new Primitive('Number', Number),
    }
  }
}

function load_type(source, loader: Loader) {
  if (source === String)
    return loader.types.String

  if (source === Number)
    return loader.types.Number

  throw Error("Not supported")
}

function load_property(name: string, source, trellis: Trellis, loader: Loader) {
  const type = load_type(source, loader)
  return new Property(name, type, trellis)
}

function load_trellis(name: string, source, loader: Loader) {
  const trellis = new Trellis(name)
  for (let name in source) {
    trellis.properties [name] = load_property(name, source [name], trellis, loader)
  }
  return trellis
}

export function define(schema: Schema, definitions) {
  const loader = new Loader()

  for (let name in definitions) {
    const definition = definitions [name]
    schema.trellises [name] = load_trellis(name, definition, loader)
  }
}

export function get_definitions(schema: Schema) {

}