import isAuthenticated from "@/middleware/authMiddleware.js"; // Impor middleware
import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "@/pages/Dashboard.vue");
const BooksPage = () => import("@/pages/Books.vue");
const LoginPage = () => import("@/pages/Auth/Login.vue");



const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        beforeEnter: isAuthenticated, // Apply middleware
      },
      {
        path: "books",
        name: "books",
        component: BooksPage,
        beforeEnter: isAuthenticated,
      },
    ],
  },
  {
    path: "/login",
    component: LoginPage
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
