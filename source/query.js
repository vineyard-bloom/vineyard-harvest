"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vineyard_lawn_1 = require("vineyard-lawn");
var commands = {
    filter: function (query, props) { return query.filter(props); },
    first: function (query, props) { return query.firstOrNull(); },
};
function run_command(query, step) {
    var commandName = typeof step == 'string'
        ? step
        : step.action;
    var command = commands[commandName];
    if (!command)
        throw new vineyard_lawn_1.Bad_Request('Invalid query command: ' + step + '.');
    return command(query, step);
}
function run_commands(request, collection) {
    var query = collection.all();
    var steps = request.steps || [];
    for (var i = 0; i < steps.length; ++i) {
        query = run_command(query, steps[i]);
    }
    return query.exec();
}
function execute(query, collections) {
    var collection = collections[query.trellis];
    if (!collection)
        throw new vineyard_lawn_1.Bad_Request('Invalid trellis: ' + query.trellis + '.');
    return run_commands(query, collection)
        .then(function (result) {
        return {
            objects: []
        };
    });
}
exports.execute = execute;
//# sourceMappingURL=query.js.map