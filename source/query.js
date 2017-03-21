"use strict";
function run_first_command(model, command) {
    if (command[0] == 'find_one') {
        return model.findOne(command[1]);
    }
}
function run_command(input, command) {
    return Promise.resolve();
}
function execute(query, models) {
    var model = models[query.trellis];
    var step = run_first_command(model, query.steps[0]);
    query.steps.slice(1).forEach(function (command) {
        step = step.then(function (input) { return run_command(input, command); });
    });
    return step
        .then(function (result) {
        return {
            objects: []
        };
    });
}
exports.execute = execute;
//# sourceMappingURL=query.js.map