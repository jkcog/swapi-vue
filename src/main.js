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
        // mutation to commit movie data to state
        setPeople(state, payload) {
          state.people = payload;
        },
        setNext(state, payload) {
            state.next = payload;
          },
        setPlanet(state, payload) {
            let name = payload.name
            console.log('payload: ', payload)
            state.people[name] = payload.planet;
          },
      },
      actions: {
        // action to fetch movie data with axios
        async getPeople (context, payload) {
            console.log(payload)
          axios.get(payload)
            .then((response) => {
                // console.log(response.data.results)
                // this.getPeople(response.data.next);
                
                let updatedList = context.state.people.concat(response.data.results)
                context.commit('setPeople', updatedList)
                context.dispatch('getPlanets')
                .then(() => {
                    context.dispatch('getPeople', response.data.next);
                })
                // context.commit('setNext', response.data.next);
                
            });

        },
      async getPlanets (context) {
        console.log('context: ', context.state.people)
        let allPeople = context.state.people
        allPeople.forEach(person => {

            axios.get(person.homeworld)
            .then((response) => {
                person.planet = response.data.name
            });
        });
        context.commit('setPlanet', allPeople);
    },
},
});


const app = createApp(App);
app.use(store);
app.mount("#app");
