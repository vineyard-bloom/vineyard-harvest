import * as lawn from 'vineyard-lawn'
import {Method, HTTP_Error, Bad_Request} from 'vineyard-lawn'
import * as query from './query'
import * as scheming from './scheming'
import {apply_schema} from "./apply_schema"
export {scheming}

export interface Bushel {
  app
  db
  schema: scheming.Schema
}

export function initialize(bushel: Bushel, base_url: string = '') {
  // const definitions = scheming.get_definitions(bushel.schema)
  // const models = vineyard_mongoose.define_schema(definitions)
  apply_schema(bushel.schema, bushel.db)

  const schema = bushel.schema

  lawn.create_endpoints(bushel.app, [

    {
      method: Method.post,
      path: base_url + "/update",
      action: function(request) {
        return Promise.resolve()
      }
    },

    {
      method: Method.post,
      path: base_url + "/query",
      action: function(request) {
        return query.execute(request.data, schema.trellises)
      }
    }

  ])
}