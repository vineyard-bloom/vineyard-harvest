import {Method, createEndpoints} from 'vineyard-lawn'
import * as query from './query'
import {Modeler} from "vineyard-ground"

export interface Bushel {
  app
  modeler: Modeler
  base_url?: string
}

export function initialize(bushel: Bushel) {
  const base_url = bushel.base_url || ''

  createEndpoints(bushel.app, [

    {
      method: Method.post,
      path: base_url + "/update",
      action: function (request) {
        return Promise.resolve()
      }
    },

    {
      method: Method.post,
      path: base_url + "/query",
      action: function (request) {
        return query.execute(request.data, bushel.modeler.collections)
      }
    }

  ])
}