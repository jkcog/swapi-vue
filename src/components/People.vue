<template>
<div class="flex justify-center my-12 font-mont">
        <input v-model="searchQuery" class="search-input">
</div>
<div  class="flex justify-center my-12">
    <Suspense>
        <template #default>
            <table class="table-auto font-mont text-2xl">
                <thead class="">
                <tr>
                    <th class="pr-32 mr-3 text-left">Name</th>
                    <th class="pr-32 mr-3 text-left">Height m</th>
                    <th class="pr-32 mr-3 text-left">Mass kg</th>
                    <th class="pr-32 mr-3 text-left">Created</th>
                    <th class="pr-32 mr-3 text-left">Edited</th>
                    <th class="pr-32 mr-3 text-left">Planet</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="person in filteredPeople" :key="person.name">
                    <person :person="person" />
                </tr>
                </tbody>
            </table>
        </template>

        <template #fallback>
            <circle8></circle8>
        </template>
    </Suspense>
</div>
    <p>Results: {{ numberOfPeople }}</p>

</template>

<script>
import {Circle8} from 'vue-loading-spinner'
import Person from './Person.vue'
import searchMixin from '../mixins/searchMixin'


export default {
      components: {
    Person,
    Circle8,
  },
    data() {
        return {
            people: [],
            peopleEndpoint: 'https://swapi.dev/api/people/',
            planetEndpoint: 'https://swapi.dev/api/planets/',
            searchQuery: '',
            page: 1,
            loading: false,
        }
    },
    computed: {
        numberOfPeople() {
            return this.filteredPeople.length
        }
    },
    methods: {
         getPeople() {
                return this.$store.dispatch('getPeople', this.peopleEndpoint);
        },
        loadMore() {
            this.loading = true
            console.log('load more: ', this.$store.state.next)
            this.$store.dispatch('getPeople', this.$store.state.next)
            .then(() => {
                this.loading = false
            })
            
        }
    },
    async created() {
            if (!this.$store.state.people.length) {
                this.loading = true
                this.people = await this.getPeople()
                this.loading = false
            }
            

        
    },
updated() {
        
    },
    mixins: [searchMixin],
}
</script>

<style>

tbody tr:nth-of-type(odd) {
   background-color: rgba(0, 0, 0, .05);
 }

</style>