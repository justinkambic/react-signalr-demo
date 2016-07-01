import expect from 'expect';
import { assignCoords, Node } from '../../src/reducers/tree';

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

describe('Node', () => {
    let tree = {};

    beforeEach('Set up basic data needed for each test.', (done) => {
            tree = {
                "id": "TestId1",
                "name": "Root",
                "value": "I am the root",
                "childNodes": [
                    {
                    "id": "TestId2",
                    "name": "Child A",
                    "value": "I am the first child. All mistakes are made here.",
                    "childNodes": [
                        {
                        "id": "TestId9",
                        "name": "Grandchild C",
                        "value": "The expectations of my older sibling weigh upon my ability to achieve.",
                        "childNodes": [
                            {
                            "id": "TestId10",
                            "name": "Greatgrandchild F",
                            "value": "The expectations of my older sibling weigh upon my ability to achieve.",
                            "childNodes": null,
                            "highlighted": false
                            }
                        ],
                        "highlighted": false
                        }
                    ],
                    "highlighted": false
                    },
                    {
                    "id": "TestId3",
                    "name": "Child B",
                    "value": "I am the middle child. My needs are neglected.",
                    "childNodes": null,
                    "highlighted": false
                    },
                    {
                    "id": "TestId4",
                    "name": "Child C",
                    "value": "I am the last child. My growth was stunted through smothering.",
                    "childNodes": [
                        {
                        "id": "TestId5",
                        "name": "Grandchild A",
                        "value": "The hopes and dreams of the family rest upon my shoulders.",
                        "childNodes": null,
                        "highlighted": false
                        },
                        {
                        "id": "TestId6",
                        "name": "Grandchild B",
                        "value": "The expectations of my older sibling weigh upon my ability to achieve.",
                        "childNodes": [
                            {
                            "id": "TestId7",
                            "name": "GreatGrandchild A",
                            "value": "Now we're just testing.",
                            "childNodes": [
                                {
                                "id": "TestId8",
                                "name": "GreatGreatGrandchild B",
                                "value": "The expectations of my older sibling weigh upon my ability to achieve.",
                                "childNodes": null,
                                "highlighted": false
                                }
                            ],
                            "highlighted": false
                            }
                        ],
                        "highlighted": false
                        }
                    ],
                    "highlighted": false
                    }
                ],
                "highlighted": false
                };

        done();
    });

    it('exists', () => {
        expect(assignCoords).toExist();
        expect(typeof(assignCoords)).toEqual('function');

    });

    it('recurses through a tree', () => {
        assignCoords(tree);
    });

    it('Gives the correct left sibling.', () => {
        const node = new Node(tree);
        let sib = node.children[1].leftSibling();
        
        expect(sib).toEqual(node.children[0]);
    });

    it('Gives the correct leftmost sibling', () => {
        const node = new Node(tree);
        let sib1 = node.children[1].lMostSibling();
        let sib2 = node.children[2].lMostSibling();
        
        expect(sib1).toEqual(node.children[0]);
        expect(sib2).toEqual(node.children[0]);
        expect(node.children[1].lmostSibling).toEqual(node.children[0]);
        expect(node.children[2].lmostSibling).toEqual(node.children[0]);
    });
});
