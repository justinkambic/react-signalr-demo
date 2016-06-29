using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace react_signalr_demo
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Tree",
                url: "tree",
                defaults: new { controller = "Home", action = "Tree" }
                );

            routes.MapRoute(
                name: "GetTree",
                url: "tree/get",
                defaults: new { controller = "Home", action = "GetTree" }
                );

            routes.MapRoute(
                name: "Test",
                url: "test",
                defaults: "/test.html");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}