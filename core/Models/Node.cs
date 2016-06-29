using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.Models
{
    public class Node
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public Node[] ChildNodes { get; set; }
        public bool Highlighted { get; set; }

        public void Highlight(string id)
        {
            if (this.Id == id)
            {
                this.Highlighted = true;
                return;
            }
            if (this.ChildNodes != null)
            {
                foreach (Node child in this.ChildNodes)
                {
                    child.Highlight(id);
                }
            }
        }

        public static Node Generate()
        {
            var root = new Node()
            {
                //Id = Guid.NewGuid().ToString(),
                Id = "TestId1",
                Name = "Root",
                Value = "I am the root",
                ChildNodes = new Node[]
                {
                    new Node()
                    {
                        //Id = Guid.NewGuid().ToString(),
                        Id = "TestId2",
                        Name = "Child A",
                        Value = "I am the first child. All mistakes are made here.",
                        ChildNodes = new Node[]
                        {
                            new Node()
                            {
                                //Id = Guid.NewGuid().ToString(),
                                Id = "TestId9",
                                Name = "Grandchild C",
                                Value = "The expectations of my older sibling weigh upon my ability to achieve.",
                                ChildNodes = new Node[]
                                {
                                    new Node()
                                    {
                                        //Id = Guid.NewGuid().ToString(),
                                        Id = "TestId10",
                                        Name = "Greatgrandchild F",
                                        Value = "The expectations of my older sibling weigh upon my ability to achieve.",
                                    }
                                }
                            }, 
                        }
                    },
                    new Node()
                    {
                        //Id = Guid.NewGuid().ToString(),
                        Id = "TestId3",
                        Name = "Child B",
                        Value = "I am the middle child. My needs are neglected.",
                        ChildNodes = null
                    },
                    new Node()
                    {
                        //Id = Guid.NewGuid().ToString(),
                        Id = "TestId4",
                        Name = "Child C",
                        Value = "I am the last child. My growth was stunted through smothering.",
                        ChildNodes = new Node[]
                        {
                            new Node()
                            {
                                //Id = Guid.NewGuid().ToString(),
                                Id = "TestId5",
                                Name = "Grandchild A",
                                Value = "The hopes and dreams of the family rest upon my shoulders.",
                                ChildNodes = null
                            },
                            new Node()
                            {
                                //Id = Guid.NewGuid().ToString(),
                                Id = "TestId6",
                                Name = "Grandchild B",
                                Value = "The expectations of my older sibling weigh upon my ability to achieve.",
                                ChildNodes = new Node[]
                                {
                                    new Node()
                                    {
                                        //Id = Guid.NewGuid().ToString(),
                                        Id = "TestId7",
                                        Name = "GreatGrandchild A",
                                        Value = "Now we're just testing.",
                                        ChildNodes = new Node[]
                                        {
                                            new Node()
                                            {
                                                //Id = Guid.NewGuid().ToString(),
                                                Id = "TestId8",
                                                Name = "GreatGreatGrandchild B",
                                                Value = "The expectations of my older sibling weigh upon my ability to achieve.",
                                            }
                                        }
                                    }
                                }
                            },
                        }
                    },
                }
            };

            return root;
        }
    }
}
