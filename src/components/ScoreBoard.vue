<script setup lang="ts">

const props = defineProps({
    history: {
        type: Array
    }
})

console.log(props.history);
</script>

<template>
    <div>   
        <h2>Score Board</h2>
        <div v-for="(game, idx) in props.history" :key="idx">
        Game {{ idx + 1 }}: {{ game }} won </div>

    </div>
</template>

<style scoped>

</style>