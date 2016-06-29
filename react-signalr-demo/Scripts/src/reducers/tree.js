
import * as Actions from '../actions/constants';


// export class DrawNode {
//     constructor(node, parent = null, depth = 0, number = 1) {
//         this.x = -1;
//         this.y = depth;

        
//     }
// }
let i = 0;
export function assignCoords(node, depth = 0) {
    node.x = i;
    i += 1;
    node.y = depth;
    if (node.childNodes) {
        if (!Array.isArray(node.childNodes)) {
            node.childNodes = Object.keys(node.childNodes).map((index) => {
                return node.childNodes[index];
            });
        }

        node.children = node.childNodes.map(
            (child) => {
                return assignCoords(child, depth + 1);
            }
        );
    }

    return node;
}

// export function assignCoords(node, parent = null, depth = 0, number = 1) {
//     node.x = number;
//     node.y = depth;
    
//     if (node.childNodes) {
//         if (!Array.isArray(node.childNodes)) {
//             node.childNodes = Object.keys(node.childNodes).map((index) => {
//                 return node.childNodes[index];
//             });
//         }

//         node.children = node.childNodes.map(
//             (child, index) => {
//                 return assignCoords(child, node, depth + 1, index);
//             });
//     }

//     node.parent = parent;
//     node.thread = null;
//     node.offset = 0;
//     node.ancestor = null;
//     node.change = 0;
//     node.shift = 0;
//     node.lmostSibling = null;
//     node.number = number;

//     return node;
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

export default function node(
    state = {
        node: undefined
    },
    action
) {
    switch(action.type) {
        case Actions.TREE_RECEIVED:
            i = 0;
            const mappedTree = assignCoords(action.tree);
            return Object.assign(
                { },
                {
                    node: mappedTree
                }
            );
        default:
            return Object.assign(
                { },
                state
            );
    }
};
