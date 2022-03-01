<template>
<div class="flex justify-center my-12 font-mont">
        <input v-model="searchQuery" class="search-input">
</div>
<div class="flex justify-center my-12">
            <table class="table">
                <thead>
                <tr>
                    <th class="table-header">Name</th>
                    <th class="table-header">Height (cm)</th>
                    <th class="table-header">Mass (kg)</th>
                    <th class="table-header">Created</th>
                    <th class="table-header">Edited</th>
                    <th class="table-header">Planet</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="person in filteredPeople" :key="person.name">
                    <person :person="person" />
                </tr>
                </tbody>
            </table>


</div>
        <div class="flex justify-center" v-if="numberOfPeople === 0">
            <circle8></circle8>
        </div>
        <div class="mx-12 my-32" v-else>
            <p>Results: {{ numberOfPeople }}</p>
        </div>
    

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
            searchQuery: '',
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
    },
    async created() {
            if (!this.$store.state.people.length) {
                this.people = await this.getPeople()
            }
    },
    mixins: [searchMixin],
}
</script>

<style>

tbody tr:nth-of-type(odd) {
   background-color: rgba(0, 0, 0, .05);
 }

</style>