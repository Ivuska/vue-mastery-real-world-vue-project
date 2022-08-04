import { reactive } from "vue";

// Create a global (reactive) object to share across multiple components.
// Reactive means that when the object is updated, any Component that uses this object is re-rendered.
// "event" is where we'll store the data returned from our API, and where our component will look for the data.
export default reactive({ flashMessage: "", event: null });
