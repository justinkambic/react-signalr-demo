/**
 * A class with all the members necessary to compute the tree drawing coordinates.
 *
 * Includes members for the data stored in the tree nodes passed from the server.
 */
export class Node {

    /**
     * Sets all necessary members for later computation.
     * @param { Object } node The data passed from the parent.
     * @param { Object } parent The node's parent, if it has one. It should be null exactly once, for the root.
     * @param { number } depth How far down the tree this node is.
     * @param { number } number The rank of child this node is.
     */
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
                    return new Node(child, this, depth + 1, iterator + 1);
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

    /**
     * Returns the node to the left of this node.
     * @returns { Object | null } null if no nodes to left.
     */
    left() {
        if (this.thread) {
            return this.thread;
        }
        if (this.children.length > 0) {
            return this.children[0];
        }

        return null;
    }

    /**
     * Returns the node to the right of this node.
     * @returns { Object | null } null if no nodes to right.
     */
    right() {
        if (this.thread) {
            return this.thread;
        }
        if (this.children.length > 0) {
            return this.children[this.children.length - 1];
        }

        return null;
    }

    /**
     * Returns the node directly to the left of this node.
     * @returns { Object | null } null if no nodes to left.
     */
    leftSibling() {
        let iterNode = null;

        if (this.parent) {
            // this is the same as the commented loop below
            // the below syntax is preferable
            // for some reason mochify can't read it properly
            for (let i = 0; i < this.parent.children.length; i += 1) {
                if (this.parent.children[i] === this) {
                    return iterNode;
                }

                iterNode = this.parent.children[i];
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

    /**
     * Finds the first child amongst this node's siblings.
     * @returns { Object | null } null if this is the leftmost child.
     */
    lMostSibling() {
        if (!this.lmostSibling &&
            this.parent &&
            this !== this.parent.children[0]) {
            this.lmostSibling = this.parent.children[0];
        }

        return this.lmostSibling;
    }
}

/**
 * Shifts a subtree to the right as needed.
 * @param { Object } leftChild The node we're shifting from.
 * @param { Object } rightChild The node we're shifting.
 * @param { number } shift The distance we need to shift.
 * @returns { void }
 */
function moveSubtree(leftChild, rightChild, shift) {
    const subtrees = rightChild.number - leftChild.number;

    rightChild.change -= (shift / subtrees);
    rightChild.shift += shift;
    leftChild.change += (shift / subtrees);
    rightChild.x += shift;
    rightChild.mod += shift;
}

/**
 * Finds the ancestor of a given node.
 * @param { Object } innerLeft The innerLeft node of the selected node.
 * @param { Object } node The node we're selecting the ancestor of.
 * @param { Object } defaultAncestor The default selection of the current subtree.
 * @returns { Object } The correct ancestor value.
 */
function ancestor(innerLeft, node, defaultAncestor) {
    if (node.parent.children.includes(innerLeft.ancestor)) {
        return innerLeft.ancestor;
    }

    return defaultAncestor;
}

/**
 * On the second walk we apply the mod for proper x spacing, and ensure proper depth is set.
 * @param { Object } node The current node.
 * @param { number } modToAdd The current mod total to add.
 * @param { number } depth The level to place for y spacing.
 * @returns { void }
 */
function secondWalk(node, modToAdd = 0, depth = 0) {
    node.x += modToAdd;
    node.y = depth;

    for (let i = 0; i < node.children.length; i += 1) {
        secondWalk(node.children[i], modToAdd + node.mod, depth + 1);
    }
}

/**
 * Performs shifts on the children of a node based on the size of the child array.
 * @param { Object } node The node whose children will shift.
 * @returns { void }
 */
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

/* eslint max-statements:0, no-param-reassign:0 */
/**
 * Designates the proper shift values for a node.
 * @param { Object } node The node to calculate.
 * @param { Object } defaultAncestor The ancestor of this subtree.
 * @param { number } distance The distance to be added for the shift.
 * @returns { Object } The ancestor of the node.
 */
function apportion(node, defaultAncestor, distance) {
    const leftSibling = node.leftSibling();

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

            const shift = (innerLeft.x + shiftInnerLeft) - (innerRight.x + shiftInnerRight) + distance;

            if (shift > 0) {
                const tmpAncestor = ancestor(innerLeft, node, defaultAncestor);

                moveSubtree(tmpAncestor, node, shift);
                shiftInnerRight = shiftInnerRight + shift;
                shiftInnerLeft = shiftInnerLeft + shift;
            }

            shiftInnerLeft += innerLeft.mod;
            shiftInnerRight += innerRight.mod;
            shiftOuterLeft += outerLeft.mod;
            shiftOuterRight += outerRight.mod;
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

/**
 * First walk computes ancestors, subtree shifts and child space distribution.
 * @param { Object } node The node to compute.
 * @param { number } distance The extra space needed for the node's X parameter.
 * @returns { Object } The computed node.
 */
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

/**
 * Applies the buchheim algorithm to an n-ary tree.
 * @param { Object } node The root of the tree to draw.
 * @returns { Object } The computed tree.
 */
export function buchheim(node) {
    const drawn = firstWalk(node);

    secondWalk(drawn);

    return drawn;
}
