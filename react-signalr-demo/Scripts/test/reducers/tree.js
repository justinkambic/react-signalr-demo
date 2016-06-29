import expect from 'expect';
import { assignCoords } from '../../src/reducers/tree';

describe('a test', () => {
    it('works', () => {
        expect(true).toBe(true);
    });
});

const tree = {
    name:'a',
    childNodes: [
        {
            name:'c',
            childNodes: [
                {
                    name: 't'
                }
            ]
        },
        {
            name:'d',
            childNodes: [
                {
                    name: 'u'
                }
            ]
        }
    ]
};

describe('assignCoords', () => {
    it('exists', () => {
        expect(assignCoords).toExist();
        expect(typeof(assignCoords)).toEqual('function');
    });

    it('recurses through a tree', () => {
        assignCoords(tree);
    })
});
