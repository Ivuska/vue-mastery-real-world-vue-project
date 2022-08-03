import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import EventLayout from "../views/events/Layout.vue";
import EventDetails from "../views/events/Details.vue";
import EventRegister from "../views/events/Register.vue";
import EventEdit from "../views/events/Edit.vue";
import AboutView from "../views/AboutView.vue";
import NotFound from "../views/NotFound.vue";
import NetworkError from "../views/NetworkError.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    //':id' is a dynamic segment
    path: "/events/:id",
    name: "EventLayout",
    // Send in route parameters as component props.
    props: true,
    component: EventLayout,
    children: [
      {
        path: "",
        name: "EventDetails",
        component: EventDetails,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit,
      },
    ],
  },
  {
    // Match on /event/, and capture everything else in AfterEvent.
    // Using (.*) so that will include / in the match (by default it doesn't).
    path: "/event/:afterEvent(.*)",
    redirect: (to) => {
      return { path: "/events/" + to.params.afterEvent };
    },
  },

  {
    path: "/about-us",
    name: "AboutView",
    component: AboutView,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () =>
    //import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    // Redirecting the path.I can also use 'alias' => just add 'alias: "name of the new route", but
    // redirect is better due to the SEO.'
    path: "/about",
    redirect: { name: "About" },
  },
  {
    // Match all routes that don't match an existing route.
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    // We will use /404/event.
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
