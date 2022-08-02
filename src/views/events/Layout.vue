<template>
  <!--We need to wait until we have the event from the server. -->
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <!-- The :id is required for each child path as we can see in index.js so we do not need to write it here. -->
      <!-- If  :id is not sent in, it will look and use  :id param that is present. -->
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>

<script>
import EventService from "@/services/EventService";

export default {
  props: ["id"],
  data() {
    return {
      event: null,
    };
  },
  created() {
    //fetch event (by id) and set local data
    EventService.getEvent(this.id)
      .then((response) => {
        this.event = response.data;
      })
      //If the request is rejected catch the situation.
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
