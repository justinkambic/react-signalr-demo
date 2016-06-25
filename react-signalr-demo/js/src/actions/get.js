
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