<template>
  <h1>Ooops!</h1>
  <!-- Resource can be "page" or "event".-->
  <h3>The {{ resource }} you've looking for is not here.</h3>
  <router-link :to="{ name: 'EventList' }">Back to the home page</router-link>
</template>
<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: "page",
    },
  },
};
</script>
