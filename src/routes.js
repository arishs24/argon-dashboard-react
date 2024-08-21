import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
// Remove unnecessary imports like Maps, Icons, Tables, etc.

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  // Remove or comment out routes you don’t need
];

export default routes;
