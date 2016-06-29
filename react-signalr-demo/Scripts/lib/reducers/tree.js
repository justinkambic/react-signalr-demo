'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assignCoords = assignCoords;
exports.default = node;

var _constants = require('../actions/constants');

var Actions = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// export function assignCoords(node, depth = 0) {
//     node.x = -1;
//     node.y = depth;

//     if (node.childNodes) {
//         if (!Array.isArray(node.childNodes)) {
//             node.childNodes = Object.keys(node.childNodes).map((index) => {
//                 return node.childNodes[index];
//             });
//         }
//         node.children = node.childNodes.map(
//             (child) => {
//                 return assignCoords(child, depth+1);
//             });
//     }
//     return node;
// }

// export class DrawNode {
//     constructor(node, parent = null, depth = 0, number = 1) {
//         this.x = -1;
//         this.y = depth;

//     }
// }

function assignCoords(node) {
    var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var depth = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var number = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

    node.x = number;
    node.y = depth;

    if (node.childNodes) {
        if (!Array.isArray(node.childNodes)) {
            node.childNodes = Object.keys(node.childNodes).map(function (index) {
                return node.childNodes[index];
            });
        }

        node.children = node.childNodes.map(function (child, index) {
            return assignCoords(child, node, depth + 1, index);
        });
    }

    node.parent = parent;
    node.thread = null;
    node.offset = 0;
    node.ancestor = null;
    node.change = 0;
    node.shift = 0;
    node.lmostSibling = null;
    node.number = number;

    return node;
}

// export function assignCoords(node, parent = null, depth = 0, number = 1) {
//     node.x = -1;
//     node.y = depth;

//     if (node.childNodes) {
//         let childIter = 0;
//         node.children = node.childNodes.map( (child) => {
//             assignCoords(child, node, depth + 1, childIter + 1);
//         });
//     }

//     node.parent = parent;
//     node.thread = null;
//     node.offset = 0;
//     node.ancestor = node;
// }

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
            var mappedTree = assignCoords(action.tree);
            return Object.assign({}, {
                node: mappedTree
            });
        default:
            return Object.assign({}, state);
    }
};