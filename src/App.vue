<script setup lang="ts">
import { ref } from 'vue';
import GameBoard from './components/GameBoard.vue';
import GetPlayers from './components/GetPlayers.vue';
import StartingBanner from './components/startingBanner.vue';

const startGame = ref(false);
const players = ref({
  playerX: '',
  playerO: ''
});

const show = ref(true);

const currentPlayer = ref('');

const setInitialPlayer = () => {
  currentPlayer.value = Math.random() < 0.5 ? players.value.playerX : players.value.playerO;
}; 

const startGameValue = (value: boolean) => {
  startGame.value = value;
  setInitialPlayer();
}

const getPlayers = (names: { playerX: string, playerO: string }) => {
    players.value.playerX = names.playerX;
    players.value.playerO = names.playerO;
    console.log(players.value.playerO);
    console.log(players.value.playerX);
  }

const togglePlayer = () => {
  currentPlayer.value = currentPlayer.value === players.value.playerX ? players.value.playerO : players.value.playerX;
  console.log(currentPlayer.value);
  
}

const toggleBanner = () => {
  show.value = false;
}

</script>

<template>
  <h1 v-if="startGame">Players move: {{ currentPlayer }}</h1>
  <main>
    <StartingBanner v-if="show" @handlePlayBtn="toggleBanner"></StartingBanner>
    <GetPlayers v-if="!show" :startGame="startGame" @start-game="startGameValue" @update:gameNames="getPlayers"></GetPlayers>
    <GameBoard v-if="startGame" :players="players" :currentPlayer="currentPlayer" @toggle-player="togglePlayer"/>
  </main>
</template>

<style scoped>


</style>
