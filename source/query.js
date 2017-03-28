"use strict";
var lawn = require('vineyard-lawn');
function run_first_command(trellis, command) {
    if (command[0] == 'find_one') {
        return trellis.table.findOne(command[1]);
    }
    else if (command[0] == 'find') {
        return trellis.table.find(command[1]);
    }
}
function run_command(input, command) {
    return Promise.resolve();
}
function execute(query, trellises) {
    var trellis = trellises[query.trellis];
    if (!trellis)
        throw new lawn.Bad_Request('Invalid trellis: ' + query.trellis + '.');
    var steps = query.steps || [['find']];
    var step = run_first_command(trellis, steps[0]);
    steps.slice(1).forEach(function (command) {
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