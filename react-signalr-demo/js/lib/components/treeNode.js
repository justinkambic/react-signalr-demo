'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = function (_Component) {
    _inherits(Node, _Component);

    function Node() {
        _classCallCheck(this, Node);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Node).apply(this, arguments));
    }

    _createClass(Node, [{
        key: 'renderChildren',
        value: function renderChildren(node, x, y) {
            var self = this;
            var array = [];

            if (node.childNodes !== null) {
                (function () {
                    var divisions = Object.keys(node.childNodes).length;
                    var totalWidth = divisions * (50 + 15);
                    var startingPoint = x - totalWidth / 2;

                    Object.keys(node.childNodes).map(function (key) {
                        return node.childNodes[key];
                    }).map(function (child) {
                        array.push(self.renderChildren(child, startingPoint, y + 50));
                        startingPoint += 65;
                    });
                })();
            }

            var component = _react2.default.createElement(_test2.default, {
                node: node,
                x: x,
                y: y
            });

            return {
                children: array,
                component: component
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
    }, {
        key: 'render',
        value: function render() {
            var component = this.renderChildren(this.props.node, 250, 100);

            return _react2.default.createElement(
                'svg',
                { width: '500', height: '900' },
                component.component,
                component.children.map(function (child) {
                    child.children.map();
                    return child.component;
                })
            );
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
        childNodes: _react.PropTypes.object
    }).isRequired
};