
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SvgNode from './test'

export default class Node extends Component {

    renderChildren(node, x, y) {
        const self = this;
        let array = [];

        if (node.childNodes !== null) {
            const divisions = Object.keys(node.childNodes).length;
            const totalWidth = divisions * (50 + 15);
            let startingPoint = x - totalWidth / 2;

            Object.keys(node.childNodes).map(key => node.childNodes[key]).map((child) => {
                array.push(self.renderChildren(child, startingPoint, y + 50));
                startingPoint += 65;
            });
        }

        const component = (
            <SvgNode
                node={ node }
                x={ x }
                y={ y }
            />
        );

        return {
            children: array,
            component
        };

        // return (
        //     <g>
                
        //     </g>
        //     <div className="node">
                
        //         <div>
        //             {
        //                 node.childNodes &&
        //                     Object.keys(node.childNodes).map(key => node.childNodes[key]).map((child) => {
        //                         return self.renderChildren(child);
        //                     })
        //             }
        //         </div>
        //     </div>
        // )
    }


    render() {
        const component = this.renderChildren(this.props.node, 250, 100);
        
        return (
            <svg width="500" height="900">
                { component.component }
                {
                    component.children.map((child) => {
                        child.children.map()
                        return child.component;
                    })
                }
            </svg>
        );
    }
};

Node.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        childNodes: PropTypes.object
    }).isRequired
};