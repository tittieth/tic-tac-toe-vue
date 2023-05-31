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


const startGameValue = (value: boolean) => {
  startGame.value = value;
}

const getPlayers = (names: { playerX: string, playerO: string }) => {
    players.value.playerX = names.playerX;
    players.value.playerO = names.playerO;
  }

const toggleBanner = () => {
  show.value = false;
}

</script>

<template>
  <main>
    <StartingBanner v-if="show" @handlePlayBtn="toggleBanner"></StartingBanner>
    <GetPlayers v-if="!show" :startGame="startGame" @start-game="startGameValue" @update:gameNames="getPlayers"></GetPlayers>
    <GameBoard v-if="startGame" :players="players" />
  </main>
</template>

<style scoped>


</style>
