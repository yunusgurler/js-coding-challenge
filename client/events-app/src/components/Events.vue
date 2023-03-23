<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="app-container">
        <div class="navbar">
            <p>Events App</p>
        </div>
        <div class="container ">
            <v-row v-if="!loading" class="mt-8  justify-center">
                <v-card @click="handleViewMore(event)" v-for="event in sortedEvents" :key="event.id"
                    style="background-color: white; color: black; margin: 2%;" width="270">
                    <v-img :src="event.photo" height="180px" cover></v-img>

                    <v-card-title>
                        {{ event.title }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ event.place }}
                    </v-card-subtitle>
                    <v-card-subtitle>
                        {{ event.date }}, {{ event.time }}
                    </v-card-subtitle>
                    <v-btn @click="handleViewMore(event)" style="margin: 0px 0px 10px 10px;" variant="outlined">
                        View more
                    </v-btn>
                </v-card>
            </v-row>
        </div>
        <Highlights />
    </div>
</template>
<script>
import axios from 'axios';
import Highlights from './Highlights.vue';
import router from '@/router';
export default {
    components: {
        Highlights
    },
    data: () => ({
        show: false,
        events: [],
        loading: true
    }),
    methods: {
        handleViewMore(event) {
            router.push({ name: 'eventDetail', params: { eventId: event.id } });
        }

    },
    mounted() {
        axios.get('https://jzyowgtb4j.execute-api.eu-north-1.amazonaws.com/events')
            .then(response => {
                this.events = response.data;
                this.loading = false;
            })
            .catch(error => {
                console.log(error);
                this.loading = false;
            });

    },
    computed: {
        sortedEvents() {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            return this.events.sort((a, b) => {
                return new Date(a.date.replace(/-/g, '/')) - new Date(b.date.replace(/-/g, '/'));
            });
        },
    },
}
</script>

<style>
.app-container {
    margin-top: 5%;
    display: flex;
    justify-content: center;
}

.container {
    max-width: 1000px;

}

.card-container {
    margin: 10px;

}

.navbar {
    width: 100%;
    height: 50px;
    background-color: #65647C;
    /* text-align: center; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    margin-bottom: 1%;
}

@media (max-width: 900px) {
    .app-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .events {
        width: 100%;
        margin-bottom: 2%;
    }

    .highlights {
        width: 100%;
        margin: 10px;
    }
}
</style>