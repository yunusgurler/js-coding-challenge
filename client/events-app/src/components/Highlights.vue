<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-col v-if="!loading" cols="auto" style="margin-top: 2%;">
        <p style="text-align: center; font-weight: 600; font-size: 20px;">This week's Highlights</p>
        <v-divider :thickness="2"></v-divider>
        <v-col cols="12" sm="4" md="12" style="margin: auto;">
            <v-card v-for="event in eventsWithin7Days" :key="event.id" @click="handleCardClick(event)"
                class="highlight-card" min-width="340" max-height="100" color="#3f3f3f" theme="dark">
                <div class="d-flex flex-no-wrap">
                    <v-avatar style="background-color: white;" class="ma-3" size="60" rounded="0">
                        <v-img :src="event.photo" max-height="125" cover></v-img>
                    </v-avatar>
                    <div class="highlight-desc">
                        <div class="d-flex justify-space-between align-center">
                            <v-card-title>
                                {{ shortenString(event.title) }}
                            </v-card-title>
                        </div>
                        <v-card-subtitle style="overflow-wrap: break-word;">{{ shortenString(event.description)
                        }}</v-card-subtitle>
                    </div>
                </div>
            </v-card>
        </v-col>
        <div class="event-adder">
            <v-btn @click="showComponent = !showComponent" class="add-icon" size="large" icon color="gray">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </div>
        <div v-if="showComponent" class="event-input-container">
            <CreateEvent />
        </div>
    </v-col>
</template>
<script>

import axios from 'axios';
import CreateEvent from './CreateEvent.vue';
import router from '@/router';

export default {
    components: {
        CreateEvent
    },
    data() {
        return {
            showComponent: false,
            show: false,
            events: [],
            loading: true

        };
    },
    computed: {
        maxTitleLength() {
            return 20;
        },
        eventsWithin7Days() {
            const now = new Date();
            const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

            return this.events.filter((event) => {
                const eventDate = new Date(event.date);
                return eventDate >= now && eventDate <= oneWeekFromNow;
            });
        }
    }, created() {
        axios.get('https://jzyowgtb4j.execute-api.eu-north-1.amazonaws.com/events')
            .then(response => {
                this.events = response.data;
                this.loading = false;
            })
            .catch(error => {
                console.log(error);
                this.loading = false;
            });

    }, methods: {
        handleCardClick(event) {
            router.push({ name: 'eventDetail', params: { eventId: event.id } });
        },
        shortenString(str) {
            if (str.length > this.maxTitleLength) {
                return str.substr(0, this.maxTitleLength) + "...";
            } else {
                return str;
            }
        },
    }
};
</script>
<style>
.highlight-card {
    margin-bottom: 2%;
    min-width: fit-content;
}

.highlight-desc {
    color: white;
}

.title-container {
    display: flex;
    align-items: center;
}

.event-adder {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
}

.add-icon {
    margin-left: 10px;
}

.event-input-container {
    min-width: fit-content;
}
</style>