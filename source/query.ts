import {Bad_Request, createEndpoints} from 'vineyard-lawn'
import {Collection_Map, Collection, Query} from "vineyard-ground";
import {promiseEach} from "../../vineyard-users/source/utility";

export type StepObject = {
  action: string
}

export type Step = string | StepObject

export interface Query_Request {
  version: string,
  trellis: string
  steps?: Step[]
}

export interface Query_Response {
  objects: any[]
}

type Command = (query: Query<any>, props) => Query<any>
type CommandMap = {
  [key: string]: Command;
}

const commands: CommandMap = {

  filter: (query, props) => query.filter(props),
  first: (query, props) => query.firstOrNull(),

}

function run_command(query, step: Step): Query<any> {
  const commandName = typeof step == 'string'
    ? step
    : step.action

  const command = commands [commandName]
  if (!command)
    throw new Bad_Request('Invalid query command: ' + step + '.')

  return command(query, step)
}

function run_commands(request: Query_Request, collection: Collection<any>): Promise<any> {
  let query = collection.all()
  const steps = request.steps || []

  for (let i = 0; i < steps.length; ++i) {
    query = run_command(query, steps[i])
  }

  return query.exec()
}

export function execute(query: Query_Request, collections: Collection_Map): Promise<Query_Response> {
  const collection = collections[query.trellis] as Collection<any>
  if (!collection)
    throw new Bad_Request('Invalid trellis: ' + query.trellis + '.')

  return run_commands(query, collection)
    .then(result => {
      return {
        objects: []
      }
    })
}