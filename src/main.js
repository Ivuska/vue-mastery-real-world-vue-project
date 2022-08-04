import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "nprogress/nprogress.css";

// Create a global (reactive) object to share across multiple components.
// Reactive means that when the object is updated, any Component that uses this object is re-rendered.
const GStore = reactive({ flashMessage: "" });

createApp(App)
  .use(store)
  .use(router)
  // make this object available for components in our app to use (inject).
  .provide("GStore", GStore)
  .mount("#app");
