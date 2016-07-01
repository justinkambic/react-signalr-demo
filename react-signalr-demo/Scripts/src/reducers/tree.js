
import * as Actions from '../actions/constants';

export class Node {
    constructor(node, parent = null, depth = 0, number = 1) {
        this.x = -1;
        this.y = depth;
        
        if (node.childNodes) {
            if (!Array.isArray(node.childNodes)) {
                node.childNodes = Object.keys(node.childNodes).map((index) => {
                    return node.childNodes[index];
                });
            }

            this.children = node.childNodes.map(
                (child, iterator) => {
                    return new Node(child, this, depth + 1, iterator + 1)
                }
            );
        } else {
            this.children = [];
        }
        this.parent = parent;
        this.thread = null;
        this.offset = 0;
        this.ancestor = node;
        this.change = 0;
        this.shift = 0;
        this.number = number;
        this.lmostSibling = null;
        this.mod = 0;

        this.id = node.id;
        this.name = node.name;
        this.value = node.value;
        this.highlighted = node.highlighted;
    }

    left() {
        if (this.thread) {
            return this.thread;
        }
        if (this.children.length > 0) {
            return this.children[0];
        }
        return null;
    }

    right() {
        if (this.thread) {
            return this.thread;
        }
        if (this.children.length > 0) {
            return this.children[this.children.length - 1];
        }
        return null;
    }

    leftSibling() {
        let n = null;
        if (this.parent) {
            // this is the same as the commented loop below
            // the below syntax is preferable
            // for some reason mochify can't read it properly
            for (let i = 0; i < this.parent.children.length; i++) {
                if (this.parent.children[i] === this) {
                    return n;
                } else {
                    n = this.parent.children[i];
                }
            }
            // for (let sibling of this.parent.children) {
            //     if (sibling == this) {
            //         return n;
            //     } else {
            //         n = sibling;
            //     }
            // }
        }

        return null;
    }

    lMostSibling() {
        if (!this.lmostSibling
            && this.parent
            && this !== this.parent.children[0]) {
            this.lmostSibling = this.parent.children[0];
        }

        return this.lmostSibling;
    }
}

function moveSubtree(leftChild, rightChild, shift) {
    let subtrees = rightChild.number - leftChild.number;
    rightChild.change -= (shift / subtrees);
    rightChild.shift += shift;
    leftChild.change += (shift / subtrees);
    rightChild.x += shift;
    rightChild.mod += shift;
}

function ancestor(innerLeft, node, defaultAncestor) {
    if (node.parent.children.includes(innerLeft.ancestor)) {
        return innerLeft.ancestor;
    } else {
        return defaultAncestor;
    }
}

function secondWalk(node, m = 0, depth = 0) {
    node.x += m;
    node.y = depth;

    for (let i = 0; i < node.children.length; i += 1) {
        secondWalk(node.children[i], m + node.mod, depth + 1);
    }
}

function executeShifts(node) {
    let shift = 0;
    let change = 0;
    for (let i = node.children.length - 1; i >= 0; i -= 1) {
        node.children[i].x += shift;
        node.children[i].mod += shift;
        change += node.children[i].change;
        shift += node.children[i].shift + change;
    }
}

function apportion(node, defaultAncestor, distance) {
    let leftSibling = node.leftSibling();
    if (leftSibling !== null) {
        let innerRight = node;
        let outerRight = node;
        let innerLeft = leftSibling;
        let outerLeft = node.lMostSibling();
        let shiftInnerRight = node.mod;
        let shiftOuterRight = node.mod;
        let shiftInnerLeft = innerLeft.mod;
        let shiftOuterLeft = outerLeft.mod;
        while (innerLeft.right() && innerRight.left()) {
            innerLeft = innerLeft.right();
            innerRight = innerRight.left();
            outerLeft = outerLeft.left();
            outerRight = outerRight.right();
            outerRight.ancestor = node;
            
            let shift = (innerLeft.x + shiftInnerLeft) - (innerRight.x + shiftInnerRight) + distance;
            if (shift > 0) {
                let a = ancestor(innerLeft, node, defaultAncestor);
                moveSubtree(a, node, shift);
                shiftInnerRight = shiftInnerRight + shift;
                shiftInnerLeft = shiftInnerLeft + shift;
            }

            shiftInnerLeft += innerLeft.mod
            shiftInnerRight += innerRight.mod
            shiftOuterLeft += outerLeft.mod
            shiftOuterRight += outerRight.mod
        }

        if (innerLeft.right() && !outerRight.right()) {
            outerRight.thread = innerLeft.right();
            outerRight.mod += shiftInnerLeft - shiftOuterRight;
        } else {
            if (innerRight.left() && !outerLeft.left()) {
                outerLeft.thread = innerRight.left();
                outerLeft.mod += shiftInnerRight - shiftOuterLeft;
            }
            defaultAncestor = node;
        }
    }

    return defaultAncestor;
}

function firstWalk(node, distance = 1.0) {
    // if node has no children
    if (node.children.length === 0) {
        // if node is not the leftmost sibling
        if (node.lMostSibling()) {
            // set location to sibling's location + distance
            node.x = node.leftSibling().x + distance;
        } else {
            node.x = 0.0;
        }
    } else {
        let defaultAncestor = node.children[0];
        for (let i = 0; i < node.children.length; i += 1) {
            firstWalk(node.children[i]);
            defaultAncestor = apportion(node.children[i], defaultAncestor, distance);
        }

        executeShifts(node);

        // calculate the midpoint of all child nodes
        const last = node.children.length - 1;
        const midpoint = (node.children[0].x + node.children[last].x) / 2;

        const leftSibling = node.leftSibling();
        
        // if there is a left sibling, positiong next to it
        // else position at midpoint
        if (leftSibling) {
            node.x = leftSibling.x + distance;
            node.mod = node.x - midpoint;
        } else {
            node.x = midpoint;
        }
    }

    return node;
}

function buchheim(node) {
    let drawn = firstWalk(node);
    secondWalk(drawn);
    return drawn;
}

export default function node(
    state = {
        node: undefined
    },
    action
) {
    switch(action.type) {
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
};
