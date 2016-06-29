'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tree = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _get = require('../actions/get');

var _treeNode = require('./treeNode');

var _treeNode2 = _interopRequireDefault(_treeNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree = exports.Tree = function (_Component) {
    _inherits(Tree, _Component);

    function Tree() {
        _classCallCheck(this, Tree);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Tree).apply(this, arguments));
    }

    _createClass(Tree, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var dispatch = this.props.dispatch;


            dispatch((0, _get.getTree)());
            (0, _get.signalrListen)(dispatch);
        }
    }, {
        key: 'render',
        value: function render() {
            var node = this.props.node;


            return _react2.default.createElement(
                'div',
                null,
                node && _react2.default.createElement(
                    'svg',
                    { width: '500', height: '900' },
                    _react2.default.createElement(_treeNode2.default, {
                        node: node
                    })
                ),
                !node && _react2.default.createElement(
                    'div',
                    null,
                    'Hello! I am a tree!!'
                )
            );
        }
    }]);

    return Tree;
}(_react.Component);

;

Tree.propTypes = {
    node: _react.PropTypes.shape({
        id: _react.PropTypes.string.isRequired,
        name: _react.PropTypes.string.isRequired,
        value: _react.PropTypes.string.isRequired,
        childNodes: _react.PropTypes.array
    })
};

function mapStateToProps(state) {
    var root = state.node;

    return {
        node: root.node
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Tree);