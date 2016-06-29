
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectNode } from '../actions/get';

export default class Node extends Component {

    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    // renderChildren(node, x, y) {
    //     const self = this;
    //     let array = [];

    //     if (node.childNodes !== null) {
    //         const divisions = Object.keys(node.childNodes).length;
    //         const totalWidth = divisions * (50 + 15);
    //         let startingPoint = x - totalWidth / 2;

    //         Object.keys(node.childNodes).map(key => node.childNodes[key]).map((child) => {
    //             array.push(self.renderChildren(child, startingPoint, y + 50));
    //             startingPoint += 65;
    //         });
    //     }

    //     const component = (
    //         <SvgNode
    //             node={ node }
    //             x={ x }
    //             y={ y }
    //         />
    //     );

    //     return {
    //         children: array,
    //         component
    //     };

    //     // return (
    //     //     <g>
                
    //     //     </g>
    //     //     <div className="node">
                
    //     //         <div>
    //     //             {
    //     //                 node.childNodes &&
    //     //                     Object.keys(node.childNodes).map(key => node.childNodes[key]).map((child) => {
    //     //                         return self.renderChildren(child);
    //     //                     })
    //     //             }
    //     //         </div>
    //     //     </div>
    //     // )
    // }

    handleSelect() {
        const { id } = this.props.node;
        selectNode(id);
    }

    render() {
        const self = this;
        const { node } = this.props;
        const { childNodes, x, y } = node;
        const coX = x * 60;
        const coY = y * 60;
        const fill = node.highlighted ? "yellow" : "black";
        return (
            <g>
                <rect width="50" height="24" fill={ fill } x={ coX } y={ coY } onClick={ this.handleSelect } />
                <text strokeWidth="0.01" x={ coX } y={ coY }>{ node.name }</text>
                {
                    childNodes &&
                    Object.keys(childNodes).map((index) => {
                        return (
                            <Node
                                node={ childNodes[index] }
                                key={ index }
                            />
                        );
                    })
                }
            </g>
        );

        // return (
        //     <svg width="500" height="900">
        //         { component.component }
        //         {
        //             component.children.map((child) => {
        //                 child.children.map()
        //                 return child.component;
        //             })
        //         }
        //     </svg>
        // );
    }
};

Node.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        childNodes: PropTypes.array
    }).isRequired,
    origin: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    })
};
