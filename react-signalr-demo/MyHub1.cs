using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using core.Models;
using Microsoft.AspNet.SignalR;

namespace react_signalr_demo
{
    public class MyHub1 : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }

        public void Send(string name, string message)
        {
            Clients.All.broadcastMessage(name, message);
        }

        public void SelectNode(string id)
        {
            Node n = Node.Generate();
            n.Highlight(id);
            Clients.All.broadcastMessage(n);
        }
    }
}