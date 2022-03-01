import { createApp } from 'vue'
import { createStore } from "vuex";
import axios from 'axios';
import App from './App.vue'
import './index.css'

const store = createStore({
    state: {
        people: [],
        next: '',
      },
      mutations: {
        setPeople(state, payload) {
          state.people = payload;
        },
      },
      actions: {
        getPeople (context, payload) {
          axios.get(payload)
            .then((response) => {
                let updatedList = context.state.people.concat(response.data.results)
                context.commit('setPeople', updatedList)
                if (response.data.next !== null) {
                  context.dispatch('getPeople', response.data.next);
                }
            });
            context.dispatch('getPlanets')

        },
      getPlanets (context) {
        let allPeople = context.state.people
        allPeople.forEach(person => {
            axios.get(person.homeworld)
            .then((response) => {
                person.planet = response.data.name
            });
        });
        context.commit('setPeople', allPeople);
    },
},
});

const app = createApp(App);
app.use(store);
app.mount("#app");
