'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTree = getTree;
exports.selectNode = selectNode;
exports.signalrListen = signalrListen;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _constants = require('./constants');

var Actions = _interopRequireWildcard(_constants);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _camelize = require('./camelize');

var _camelize2 = _interopRequireDefault(_camelize);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.jQuery = _jquery2.default;
require('signalr');


function treeFetchAction() {
    return {
        type: Actions.TREE_FETCH_SUBMIT
    };
}

function treeReceive(json) {
    var camelizedJson = (0, _camelize2.default)(json);

    return {
        type: Actions.TREE_RECEIVED,
        tree: camelizedJson
    };
}

function getTree() {
    return function (dispatch) {
        dispatch(treeFetchAction());

        var url = '/tree/get';

        return (0, _isomorphicFetch2.default)(url, {
            method: 'get',
            headers: {
                Accept: 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            dispatch(treeReceive(json));
        });
    };
};

function selectNode(id) {
    (0, _jquery2.default)(function () {
        var proxy = _jquery2.default.connection.myHub1;

        _jquery2.default.connection.hub.start().done(function () {
            proxy.server.selectNode(id);
        });
    });
}

function signalrListen(dispatch) {
    (0, _jquery2.default)(function () {
        var chat = _jquery2.default.connection.myHub1;

        chat.client.broadcastMessage = function (a, b) {
            dispatch(treeReceive(a));
        };

        // $.connection.hub.start().done(function() {
        //     // chat.server.send('hello', 'world');
        //     chat.server.selectNode('TestId1');
        // });
    });
}