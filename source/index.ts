import * as mongoose from 'mongoose'
import * as lawn from 'vineyard-lawn'
import {Method, HTTP_Error, Bad_Request} from 'vineyard-lawn'
import * as query from './query'

export interface Bushel {
  app
  connection: mongoose.Connection
  models
}

export function initialize(bushel: Bushel, base_url:string = '') {
  const models = bushel.models

  lawn.initialize_endpoints(bushel.app, [

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
      action: function(request:query.Query_Request) {
        return query.execute(request, models)
      }
    }

  ])
}