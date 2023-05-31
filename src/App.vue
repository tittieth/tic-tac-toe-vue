<script setup lang="ts">
import { ref } from 'vue';
import GameBoard from './components/GameBoard.vue';
import GetPlayers from './components/GetPlayers.vue';
import StartingBanner from './components/StartingBanner.vue';

const startGame = ref(false);

const players = ref({
  playerX: '',
  playerO: ''
});

const show = ref(true);
const names = ref(false);


const startGameValue = () => {
  startGame.value = true;
  names.value = false;
}

const getPlayers = (names: { playerX: string, playerO: string }) => {
    players.value.playerX = names.playerX;
    players.value.playerO = names.playerO;
  }

const toggleBanner = () => {
  show.value = false;
  names.value = true;
}

const endGame = () => {
  startGame.value = false; 
  show.value = true; 
  localStorage.clear();
}

</script>

<template>
  <main>
    <StartingBanner v-if="show" @handlePlayBtn="toggleBanner"></StartingBanner>
    <GetPlayers v-if="names" :startGame="startGame" @start-game="startGameValue" @update:gameNames="getPlayers"></GetPlayers>
    <GameBoard v-if="startGame" :players="players" @end-game="endGame"/>
  </main>
</template>

<style scoped>


</style>
