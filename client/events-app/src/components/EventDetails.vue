<template>
    <v-container fluid>
        <div class="navbar">
            <v-btn @click="goBack" style="position: fixed; left: 0%;" class="ma-2" color="white ">
                <v-icon start variant="outlined" icon="mdi-arrow-left"></v-icon>
            </v-btn>
            <p>Events App</p>
        </div>
        <v-row v-if="!loading" class="justify-center" style="margin-top: 4%;">
            <v-col cols="12" md="9">
                <v-card>
                    <div class="d-md-flex justify-md-space-between">
                        <div class="d-flex ">
                            <v-card-text>
                                <div>
                                    <div class="d-md-flex justify-md-space-between align-md-center"
                                        style="min-width: 50vw;">
                                        <div class="d-flex align-center justify-md-space-between">
                                            <v-icon color="info" icon="mdi-information" size="x-large"></v-icon>

                                            <p style="font-size: 18px; padding: 5px;">{{ event.title }}</p>
                                        </div>
                                        <h4> {{ event.place }} </h4>

                                        <div>
                                            <v-card-subtitle>
                                                {{ event.date }}, {{ event.time }}
                                            </v-card-subtitle>
                                        </div>
                                    </div>
                                    <div style="max-width: 800px;">
                                        <p style="overflow-wrap: break-word; margin-top: 2%;">{{ event.description }}</p>
                                    </div>
                                </div>
                            </v-card-text>
                        </div>
                        <v-img :src="event.photo" class="align-self-start justify-self-end"
                            style="border-radius: 10px; margin: 2%; max-width: 450px; min-height: 200; min-width: 200; margin-left: 4%;"
                            alt="Event Photo"></v-img>
                    </div>
                </v-card>
                <v-col cols="12" sm="6" md="4">
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import router from '@/router';
import axios from 'axios';
export default {
    name: 'EventDetailsPage',
    methods: {
        goBack() {
            router.go(-1)
        }
    },
    data() {
        return {
            event: null,
            loading: true,
            error: null
        };
    },
    mounted() {
        axios.get('https://jzyowgtb4j.execute-api.eu-north-1.amazonaws.com/events/' + this.eventId)
            .then(response => {
                console.log(response.data);
                this.event = response.data;
                this.loading = false;
            })
            .catch(error => {
                console.log(error);
                this.error = error.message;
                this.loading = false;
            });
    },
    computed: {
        eventId() {
            return this.$route.params.eventId;
        },
    }
}
</script>
<style>
.navbar {
    width: 100%;
    height: 50px;
    position: fixed;
    z-index: 3;
    top: 0%;
    left: 0%;
    background-color: #000000;
    color: #cecde4;
    display: flex;
    align-items: center;
    font-size: 24px;
}
</style>