'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SvgNode = function (_Component) {
    _inherits(SvgNode, _Component);

    function SvgNode() {
        _classCallCheck(this, SvgNode);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SvgNode).apply(this, arguments));
    }

    _createClass(SvgNode, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var x = _props.x;
            var y = _props.y;


            return _react2.default.createElement(
                'g',
                null,
                _react2.default.createElement('rect', { width: '50', height: '20', x: x, y: y }),
                _react2.default.createElement(
                    'text',
                    { width: '30', height: '10', x: x, y: y },
                    this.props.node.name
                )
            );
        }
    }]);

    return SvgNode;
}(_react.Component);

exports.default = SvgNode;
;

Node.propTypes = {
    node: _react.PropTypes.shape({
        id: _react.PropTypes.string.isRequired,
        name: _react.PropTypes.string.isRequired,
        value: _react.PropTypes.string.isRequired,
        childNodes: _react.PropTypes.object
    }).isRequired,
    x: _react.PropTypes.number,
    y: _react.PropTypes.number
};