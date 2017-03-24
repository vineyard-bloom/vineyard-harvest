import {Schema, Library, Property, Type_Category} from "./scheming"
import * as Sequelize from 'sequelize'

function get_field(property: Property, library: Library): any {
  const type = property.type
  if (type.get_category() == Type_Category.primitive) {
    if (type === library.types.Int)
      return Sequelize.INTEGER

    if (type === library.types.String)
      return Sequelize.STRING
  }

  throw Error("Not implemented or supported")
}

export function apply_schema(schema: Schema, library: Library, sequelize) {
  for (let name in schema.trellises) {
    const trellis = schema.trellises [name]
    const fields = {}
    for (let i in trellis.properties) {
      fields[i] = get_field(trellis.properties[i], library)
    }
    const model = sequelize.define(trellis.name, fields)
  }

  for (let name in schema.trellises) {
    const trellis = schema.trellises [name]

  }
}
