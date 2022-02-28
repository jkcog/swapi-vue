<template>
          <td class="py-">{{ person.name }}</td>
        <td class="py-6">{{ person.height }}</td>
        <td class="py-6">{{ person.mass }}</td>
        <td class="py-6">{{ person.created }}</td>
        <td class="py-6">{{ person.edited }}</td>
        <td class="py-6">{{ person.planet }}</td>
</template>


<script>
export default {

        props: ['person'],

}
</script>

<style>

</style>