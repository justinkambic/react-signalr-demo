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

        public static Node Generate()
        {
            var root = new Node()
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Root",
                Value = "I am the root",
                ChildNodes = new Node[]
                {
                    new Node()
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = "Child A",
                        Value = "I am the first child. All mistakes are made here.",
                        ChildNodes = null
                    },
                    new Node()
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = "Child B",
                        Value = "I am the middle child. My needs are neglected.",
                        ChildNodes = null
                    },
                    new Node()
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = "Child C",
                        Value = "I am the last child. My growth was stunted through smothering.",
                        ChildNodes = new Node[]
                        {
                            new Node()
                            {
                                Id = Guid.NewGuid().ToString(),
                                Name = "Grandchild A",
                                Value = "The hopes and dreams of the family rest upon my shoulders.",
                                ChildNodes = null
                            },
                            new Node()
                            {
                                Id = Guid.NewGuid().ToString(),
                                Name = "Grandchild B",
                                Value = "The expectations of my older sibling weigh upon my ability to achieve.",
                                ChildNodes = null
                            },
                        }
                    },
                }
            };

            return root;
        }
    }
}
