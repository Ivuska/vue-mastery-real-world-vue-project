<template>
  <!--We need to wait until we have the event from the server. -->
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div id="nav">
      <!-- The :id is required for each child path as we can see in index.js so we do not need to write it here. -->
      <!-- If  :id is not sent in, it will look and use  :id param that is present. -->
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="GStore.event" />
  </div>
</template>

<script>
export default {
  inject: ["GStore"],
};
</script>
