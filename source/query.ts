import * as lawn from 'vineyard-lawn'

export interface Query_Request {
  version: string,
  trellis: string
  steps?: any[][]
}

export interface Query_Response {
  objects: any[]
}

function run_first_command(trellis, command): Promise<any> {
  if (command[0] == 'find_one') {
    return trellis.table.findOne(command[1])
  }
  else if (command[0] == 'find') {
    return trellis.table.find(command[1])
  }
}

function run_command(input, command): Promise<any> {
  return Promise.resolve()
}

export function execute(query: Query_Request, trellises): Promise<Query_Response> {
  const trellis = trellises[query.trellis]
  if (!trellis)
    throw new lawn.Bad_Request('Invalid trellis: ' + query.trellis + '.')

  const steps = query.steps || [['find']]
  let step = run_first_command(trellis, steps[0])

  steps.slice(1).forEach(command => {
    step = step.then(input => run_command(input, command))
  })

  return step
    .then(result => {
      return {
        objects: []
      }
    })
}