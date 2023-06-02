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
    type: Array,
    required: true
  }
});

</script>

<template>
    <div class="score-board-wrapper">   
        <h2>Scoreboard</h2>
        <div>{{ playerO.name }}: {{ playerO.gamePoints }}p </div>
        <div>{{ playerX.name }}: {{ playerX.gamePoints }}p </div>
        <div v-if="props.history.length > 0" class="game-history">
        Latest Game: {{ props.history[props.history.length - 1] }} won
        </div>
    </div>
</template>

<style scoped>
.score-board-wrapper {
    @media screen and (min-width: 1220px) {
            border: 2px solid #C6A664;
            position: absolute;
            margin: 100px 0 0 100px;
            padding: 10px 40px 40px;
            border-radius: 6px;
        }
}

.game-history {
    text-decoration: overline;
    margin-top: 20px;
}

h2 {
    text-decoration: underline;
}
</style>