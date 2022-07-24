/* eslint-disable */
<template>
  <div class="events">
    <h1>Events for Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";

export default {
  name: "EventList",
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
    };
  },
  //Lifecycle hook (component have more lifecycle hooks), when the component is created it calls the server for the events stored in the
  //mocked db on the URL below.
  //Axios (stored in EventService) is asynced and promise based so we need to wait for the request. Achieve that we use then().
  created() {
    EventService.getEvents()
      .then((response) => {
        this.events = response.data;
      })
      //If the request is rejected catch the situation.
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
