export interface Query_Request {
  version: string,
  trellis: string
  steps: any[][]
}

export interface Query_Response {
  objects: any[]
}

function run_first_command(model, command): Promise<any> {
  if (command[0] == 'find_one') {
    return model.findOne(command[1])
  }
}

function run_command(input, command): Promise<any> {
  return Promise.resolve()
}

export function execute(query: Query_Request, models): Promise<Query_Response> {
  const model = models[query.trellis]

  let step = run_first_command(model, query.steps[0])

  query.steps.slice(1).forEach(command => {
    step = step.then(input => run_command(input, command))
  })

  return step
    .then(result => {
      return {
        objects: []
      }
    })
}