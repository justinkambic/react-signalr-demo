
using Microsoft.Owin;

namespace react_signalr_demo
{
    using Owin;
    [assembly: OwinStartup(typeof(Startup))]

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}