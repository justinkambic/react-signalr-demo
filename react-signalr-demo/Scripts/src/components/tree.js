
import React, { Component, PropTypes } from 'react';
import { getTree, signalrListen } from '../actions/get';
import Node from './treeNode';
import { connect } from 'react-redux';

/**
 * Nests the tree and other views based on the application state.
 */
export class Tree extends Component {

    /**
     * Called once the component mounts.
     * @returns { void }
     */
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(getTree());
        signalrListen(dispatch);
    }

    /**
     * Required render function.
     * @returns { Object } The React component.
     */
    render() {
        const { node } = this.props;

        return (
            <div>
                {
                    node &&
                    <svg width="900" height="900">
                        <Node
                            node={ node }
                        />
                    </svg>
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
}

Tree.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        childNodes: PropTypes.array
    }),
    dispatch: PropTypes.func
};

/**
 * Receives redux updates and maps them to the component's props.
 * @param { Object } state The new state.
 * @returns { Object } The props updates.
 */
function mapStateToProps(state) {
    const root = state.node;

    return {
        node: root.node
    };
}

export default connect(mapStateToProps)(Tree);
