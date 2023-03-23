// Composables
import { createRouter, createWebHistory } from "vue-router";
import Events from "../components/Events";
import EventDetails from "../components/EventDetails";
const routes = [
  {
    path: "/event-detail:eventId",
    name: "eventDetail",
    component: EventDetails,
    props: (route) => ({ event: route.params.event }),
  },
  {
    path: "/",
    name: "home",
    component: Events,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
