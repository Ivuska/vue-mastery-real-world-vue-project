import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import GStore from "./store";
import "nprogress/nprogress.css";

createApp(App)
  .use(router)
  // make this object available for components in our app to use (inject).
  .provide("GStore", GStore)
  .mount("#app");
