import * as Actions from './constants';
import $ from 'jquery';
window.jQuery = $;

/* global require */
require('signalr');
import camelize from './camelize';
import fetch from 'isomorphic-fetch';

/**
 * Returns an action denoting the app is submitting a request for the tree.
 * @returns { Object } The action.
 */
function treeFetchAction() {
    return {
        type: Actions.TREE_FETCH_SUBMIT
    };
}

/**
 * Returns an action denoting the tree has been received.
 * @param { Object } json The json, which is camelized and added to the action.
 * @returns { Object } The action.
 */
function treeReceive(json) {
    const camelizedJson = camelize(json);

    return {
        type: Actions.TREE_RECEIVED,
        tree: camelizedJson
    };
}

/**
 * Will get the tree and dispatch relevant actions.
 * @returns { function } Thunk middleware will call this when it's returned to Redux
 */
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
}

/**
 * SignalR callback to alert the server that a node is selected on a client.
 * @param { string } id The id of the selected node.
 * @returns { void }
 */
export function selectNode(id) {
    $(() => {
        const proxy = $.connection.myHub1;

        $.connection.hub.start().done(() => {
            proxy.server.selectNode(id);
        });
    });
}

/**
 * Establishes a SingalR websockets connection to the server.
 * @param { function } dispatch The link back to the Redux store for when a new tree is received via WebSockets.
 * @returns { void }
 */
export function signalrListen(dispatch) {
    $(() => {
        const chat = $.connection.myHub1;

        chat.client.broadcastMessage = function(tree) {
            dispatch(treeReceive(tree));
        };
    });
}
