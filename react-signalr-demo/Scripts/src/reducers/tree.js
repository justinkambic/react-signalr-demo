
import * as Actions from '../actions/constants';
import { Node, buchheim } from '../helper/drawTree';

/**
 * The reducer for the tree structure received from the server.
 * @param { Object } state The current state.
 * @param { Object } action The action to be handled.
 * @returns { Object } the state for the new component.
 */
export default function node(
    state = {
        node: undefined
    },
    action
) {
    switch (action.type) {
        case Actions.TREE_RECEIVED:
            const tree = new Node(action.tree);
            const formatted = buchheim(tree);

            return Object.assign(
                { },
                {
                    node: formatted
                }
            );
        default:
            return Object.assign(
                { },
                state
            );
    }
}
