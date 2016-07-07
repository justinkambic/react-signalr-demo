
import React, { Component, PropTypes } from 'react';
import { selectNode } from '../actions/get';

/**
 * Represents individual node of tree to be rendered.
 */
export default class Node extends Component {

    /**
     * Constructor
     * @param { Object } props The React.js props
     * @returns { void }
     */
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    /**
     * Called when user clicks on this node
     * @returns { void }
     */
    handleSelect() {
        const { id } = this.props.node;

        selectNode(id);
    }

    /**
     * Required render function.
     * @returns { Object } The React component.
     */
    render() {
        const { node } = this.props;
        const { children, x, y } = node;
        const coX = (x * 90) + 60;
        const coY = (y * 90) + 60;
        const fill = node.highlighted ? 'yellow' : 'black';

        // TODO: not hardcode, should come from a settings reducer
        const width = 50;
        const height = 25;
        const { parentOrigin } = this.props;

        // origin to pass to children
        const originToPass = {
            x: coX + (width / 2),
            y: coY + height
        };

        // origin to draw line to parent
        const topOriginX = coX + (width / 2);
        const topOriginY = coY;

        return (
            <g>
                {
                    parentOrigin &&
                    <line
                        x1={ parentOrigin.x }
                        y1={ parentOrigin.y }
                        x2={ topOriginX }
                        y2={ topOriginY }
                        stroke="black"
                        stroke-width="2" />
                }
                <rect width={ width } height={ height } fill={ fill } x={ coX } y={ coY } onClick={ this.handleSelect } />
                <text strokeWidth="0.01" x={ coX } y={ coY }>{ node.name }</text>
                {
                    children &&
                    Object.keys(children).map((index) => {
                        return (
                            <Node
                                node={ children[index] }
                                key={ index }
                                parentOrigin={ originToPass }
                            />
                        );
                    })
                }
            </g>
        );
    }
}

Node.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        children: PropTypes.array
    }).isRequired,
    parentOrigin: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    })
};
