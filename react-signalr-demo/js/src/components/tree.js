
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getTree } from '../actions/get';
import Node from './treeNode';

export class Tree extends Component {
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(getTree());
    }
    
    render() {
        const { node } = this.props;

        return (
            <div>
                {
                    node &&
                    <Node
                        node={ node }
                    />
                }
                {
                    !node &&
                    <div>
                        Hello! I am a tree!!
                    </div>
                }
            </div>
        );
    }
};

Tree.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        childrenNodes: PropTypes.object
    })
};

function mapStateToProps(state) {
    const root = state.node;

    return {
        node: root.node
    };
}

export default connect(mapStateToProps)(Tree);