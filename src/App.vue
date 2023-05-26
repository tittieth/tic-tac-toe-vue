<script setup lang="ts">
import { ref } from 'vue';
import GameBoard from './components/GameBoard.vue';
import GetPlayers from './components/GetPlayers.vue';

const startGame = ref(false);

const startGameValue = (value: boolean) => {
  startGame.value = value;
}

</script>

<template>
  <header>
  </header>
  <main>
    <GetPlayers :startGame="startGame" @start-game="startGameValue"></GetPlayers>
    <GameBoard v-if="startGame"/>
  </main>
</template>

<style scoped>


</style>
