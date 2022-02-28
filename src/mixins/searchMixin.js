export default {
    computed: {
      filteredPeople() {
        if (this.searchQuery === '') {
          return this.$store.state.people
        }
        return this.$store.state.people.filter((person) => person.name.toLowerCase()
          .match(this.searchQuery.toLowerCase()));
      },
    },
  };
