
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class SvgNode extends Component {

    render() {
        
        const { x, y } = this.props;

        return (
            <g>
                <rect width="50" height="20" x={ x } y={ y } />
                <text width="30" height="10" x={ x } y={ y }>
                    { this.props.node.name }
                </text>
            </g>
        );
    }
};

Node.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        childNodes: PropTypes.object
    }).isRequired,
    x: PropTypes.number,
    y: PropTypes.number
};