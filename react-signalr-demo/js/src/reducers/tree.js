
import * as Actions from '../actions/constants';

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
            return Object.assign(
                { },
                {
                    node: action.tree
                }
            );
        default:
            return Object.assign(
                { },
                state
            );
    }
};
