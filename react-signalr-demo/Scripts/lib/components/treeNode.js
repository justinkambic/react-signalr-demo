'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _get = require('../actions/get');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = function (_Component) {
    _inherits(Node, _Component);

    function Node(props) {
        _classCallCheck(this, Node);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Node).call(this, props));

        _this.handleSelect = _this.handleSelect.bind(_this);
        return _this;
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

    _createClass(Node, [{
        key: 'handleSelect',
        value: function handleSelect() {
            var id = this.props.node.id;

            (0, _get.selectNode)(id);
        }
    }, {
        key: 'render',
        value: function render() {
            var self = this;
            var node = this.props.node;
            var childNodes = node.childNodes;
            var x = node.x;
            var y = node.y;

            var coX = x * 60;
            var coY = y * 60;
            var fill = node.highlighted ? "yellow" : "black";
            return _react2.default.createElement(
                'g',
                null,
                _react2.default.createElement('rect', { width: '50', height: '24', fill: fill, x: coX, y: coY, onClick: this.handleSelect }),
                _react2.default.createElement(
                    'text',
                    { strokeWidth: '0.01', x: coX, y: coY },
                    node.name
                ),
                childNodes && Object.keys(childNodes).map(function (index) {
                    return _react2.default.createElement(Node, {
                        node: childNodes[index],
                        key: index
                    });
                })
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
    }]);

    return Node;
}(_react.Component);

exports.default = Node;
;

Node.propTypes = {
    node: _react.PropTypes.shape({
        id: _react.PropTypes.string.isRequired,
        name: _react.PropTypes.string.isRequired,
        value: _react.PropTypes.string.isRequired,
        childNodes: _react.PropTypes.array
    }).isRequired,
    origin: _react.PropTypes.shape({
        x: _react.PropTypes.number.isRequired,
        y: _react.PropTypes.number.isRequired
    })
};