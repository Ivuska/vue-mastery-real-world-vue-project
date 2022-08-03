<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  props: ["event"],
  methods: {
    register() {
      // Call to API.
      // If registered then redirect to event details.

      // Navigate the user to this location.
      // If you want navigate without pushing a history into the browser (effectively disabling the back button),
      // this will replace the current page with the EventDetails page.
      // this.$router.replace({ name: "EventDetails", params: { id: 3} }).
      this.$router.push({
        name: "EventDetails",
      });
    },
    // I can programmatically invoke the browser back and forward buttons with:
    // this.$router.go(1) - goes forward (like my browser's forward button)
    // this.$rouer.go(-1) - hoes backward (like your browser's back button)
    // Can be useful for building a native app where I have custom back & forward buttons.
  },
};
</script>
