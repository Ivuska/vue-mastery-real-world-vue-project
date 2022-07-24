<template>
    <!--We need to wait until we have the event from the server. -->
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>
    </div>
</template>

<script>
import EventService from '@/services/EventService'

export default {
    props: ['id'],
    data() {
        return {
            event: null,
        }
    },
    created() {
        //fetch event (by id) and set local data
        EventService.getEvent(this.id)
            .then(response => {
                this.event = response.data
            })
            //If the request is rejected catch the situation.
        .catch(error => {
            console.log(error)
        })
    }
}

</script>