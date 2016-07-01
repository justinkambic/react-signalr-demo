
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
        const { children, x, y } = node;
        const coX = (x * 90) + 60;
        const coY = (y * 90) + 60;
        const fill = node.highlighted ? "yellow" : "black";
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
        children: PropTypes.array
    }).isRequired,
    parentOrigin: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    })
};
