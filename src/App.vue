<script setup lang="ts">
import { ref } from 'vue';
import GameBoard from './components/GameBoard.vue';
import GetPlayers from './components/GetPlayers.vue';

const startGame = ref(false);
const players = ref({
  playerX: '',
  playerO: ''
});

const currentPlayer = ref('');

const startGameValue = (value: boolean) => {
  startGame.value = value;
  currentPlayer.value = value ? 'player0' : 'playerX'
}

const togglePlayer = (names: { playerX: string, playerO: string }) => {
    players.value.playerX = names.playerX;
    players.value.playerO = names.playerO;
    console.log(players.value.playerO);
    console.log(players.value.playerX);
    currentPlayer.value = Math.random() < 0.5 ? players.value.playerX : players.value.playerO; 
  }

  const handleBoardClick = () => {
  currentPlayer.value = currentPlayer.value === players.value.playerX ? players.value.playerO : players.value.playerX;
}

</script>

<template>
  <h1 v-if="startGame">Players move: {{ currentPlayer }}</h1>
  <main>
    <GetPlayers :startGame="startGame" @start-game="startGameValue" @update:gameNames="togglePlayer"></GetPlayers>
    <GameBoard v-if="startGame" @board-click="handleBoardClick"/>
  </main>
</template>

<style scoped>


</style>
