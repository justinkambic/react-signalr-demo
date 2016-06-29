using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using core.Models;

namespace react_signalr_demo.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Tree()
        {
            return View();
        }

        public JsonResult GetTree()
        {
            return Json(Node.Generate(), JsonRequestBehavior.AllowGet);
        }
    }
}
