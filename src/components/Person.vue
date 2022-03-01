<template>
        <td class="py-">{{ person.name }}</td>
        <td class="py-6">{{ person.height }}</td>
        <td class="py-6">{{ person.mass }}</td>
        <td class="py-6">{{ new Date(person.created).toDateString() }}</td>
        <td class="py-6">{{ new Date(person.edited).toDateString() }}</td>
        <td class="py-6">{{ person.planet ? person.planet : 'loading...' }}</td>
</template>


<script>
export default {
        props: ['person'],
}
</script>

<style>

</style>