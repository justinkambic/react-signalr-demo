'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = node;

var _constants = require('../actions/constants');

var Actions = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// function fixCase(node) {
//     return {
//         id: node.Id,
//         name: node.Name,
//         value: node.Value,
//         children: node.ChildNodes
//     };
// };

// function formatTree(node) {

//     return node = fixCase(node);
// }

function node() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {
        node: undefined
    } : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case Actions.TREE_RECEIVED:
            return Object.assign({}, {
                node: action.tree
            });
        default:
            return Object.assign({}, state);
    }
};