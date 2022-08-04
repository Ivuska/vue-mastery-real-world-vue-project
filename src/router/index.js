import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import EventLayout from "../views/events/Layout.vue";
import EventDetails from "../views/events/Details.vue";
import EventRegister from "../views/events/Register.vue";
import EventEdit from "../views/events/Edit.vue";
import AboutView from "../views/AboutView.vue";
import NotFound from "../views/NotFound.vue";
import NetworkError from "../views/NetworkError.vue";
import NProgress from "nprogress";
import EventService from "@/services/EventService";
import GStore from "@/store";

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
    beforeEnter: (to) => {
      //fetch event (by id) and set local data
      return (
        EventService.getEvent(to.params.id)
          .then((response) => {
            GStore.event = response.data;
          })
          //If the request is rejected catch the situation.
          .catch((error) => {
            // If the event doesn't exist, load 404.
            if (error.response && error.response.status == 404) {
              return {
                name: "404Resource",
                params: { resource: "event" },
              };
              // Otherwise assume network error.
            } else {
              return { name: "NetworkError" };
            }
          })
      );
    },
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
        meta: { requireAuth: true },
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
    // Route level code-splitting.
    // This generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
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

// Start the progress bar before navigation.
router.beforeEach((to, from) => {
  NProgress.start();

  const notAuthorized = true;
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = "Sorry, you are not authorized to view this page.";

    setTimeout(() => {
      GStore.flashMessage = "";
    }, 3000);

    if (from.href) {
      // If this navigation came from a previous page.
      return false;
    } else {
      // Must be anvigating directly.
      // Push navigation to the root route.
      return { path: "/" };
    }
  }
});

// Finish the progress bar after navigation.
router.afterEach(() => {
  NProgress.done();
});

export default router;
