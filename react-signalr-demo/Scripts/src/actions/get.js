import $ from 'jquery';
window.jQuery = $;
require('signalr');
import * as Actions from './constants';
import fetch from 'isomorphic-fetch';
import camelize from './camelize';

function treeFetchAction() {
    return {
        type: Actions.TREE_FETCH_SUBMIT
    }
}


function treeReceive(json) {
    const camelizedJson = camelize(json);

    return {
        type: Actions.TREE_RECEIVED,
        tree: camelizedJson
    }
}

export function getTree() {
    return (dispatch) => {
        dispatch(treeFetchAction());
        
        const url = `/tree/get`;

        return fetch(url, {
            method: 'get',
            headers: {
                Accept: 'application/json'
            }
        }).then(
            (response) => {
                return response.json();
            }
        )
        .then(
            (json) => {
                dispatch(treeReceive(json));
            }
        );
    };
};

export function selectNode(id) {
    $(function() {
        var proxy = $.connection.myHub1;

        $.connection.hub.start().done(function() {
            proxy.server.selectNode(id);
        });
    });
}

export function signalrListen(dispatch) {
    $(function() {
        var chat = $.connection.myHub1;

        chat.client.broadcastMessage = function(a, b) {
            dispatch(treeReceive(a));
        };

        // $.connection.hub.start().done(function() {
        //     // chat.server.send('hello', 'world');
        //     chat.server.selectNode('TestId1');
        // });
    });
}