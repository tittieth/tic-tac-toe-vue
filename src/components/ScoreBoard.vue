<script setup lang="ts">

const props = defineProps({
  playerX: {
    type: Object,
    required: true,
  },
  playerO: {
    type: Object,
    required: true,
  },
  history: {
    type: Array
  }
});

</script>

<template>
    <div class="score-board-wrapper">   
        <h2>Scoreboard</h2>
        <div v-for="(game, idx) in props.history" :key="idx">
        Game {{ idx + 1 }}: {{ game }} won </div>
        <div>{{ playerO.name }}: {{ playerO.gamePoints }} </div>
        <div>{{ playerX.name }}: {{ playerX.gamePoints }} </div>
    </div>
</template>

<style scoped>

</style>