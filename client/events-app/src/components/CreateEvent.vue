<template>
    <v-container style="background-color: whitesmoke; border-radius: 10px;" class="create-event-container">
        <v-form @submit.prevent="createEvent">
            <v-text-field v-model="eventTitle" label="Event title"></v-text-field>
            <v-text-field v-model="eventDescription" label="Event Description"></v-text-field>
            <v-text-field v-model="eventDate" label="Event Date" type="date"></v-text-field>
            <v-text-field v-model="eventTime" label="Event Time" type="time"></v-text-field>
            <v-text-field v-model="eventPlace" label="Event place"></v-text-field>
            <v-text-field v-model="eventPhoto" label="Event photo url"></v-text-field>
            <v-btn :disabled="isFormEmpty" type="submit" style="margin: 0px 0px 10px 10px;" variant="outlined">
                Create Event
            </v-btn>
        </v-form>
    </v-container>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            id: '',
            eventTitle: '',
            eventDescription: '',
            eventDate: '',
            eventTime: '',
            eventPlace: '',
            eventPhoto: '',
        };
    },
    computed: {
        isFormEmpty() {
            return !this.eventTitle || !this.eventDescription || !this.eventDate || !this.eventTime || !this.eventPlace || !this.eventPhoto;
        }
    },
    methods: {
        createEvent() {
            const randomId = Math.floor(Math.random() * 1000000);
            const eventData = {
                id: randomId.toString(),
                title: this.eventTitle,
                description: this.eventDescription,
                date: this.eventDate,
                time: this.eventTime,
                place: this.eventPlace,
                photo: this.eventPhoto
            };
            axios.post("https://jzyowgtb4j.execute-api.eu-north-1.amazonaws.com/events", eventData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>
