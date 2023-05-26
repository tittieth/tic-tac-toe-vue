<script setup lang="ts">
import { ref } from 'vue';

const game = ref({
    playerX: {
      name: '',
      active: true,
    },
    playerO: {
      name: '',
      active: false,
    },
    startGame: false,
  });

const savePlayerX = () => {
    console.log(game.value.playerX.name);
    localStorage.setItem("userX", game.value.playerX.name);
    game.value.playerX.active = false; 
    game.value.playerO.active = true;
    console.log(game.value.playerO.active);
};

const props = defineProps({
  startGame: Boolean
});

console.log(props.startGame);

const emit = defineEmits(['start-game']);

const savePlayerYAndRenderGameBoard = () => {
  localStorage.setItem("userO", game.value.playerO.name);
  game.value.startGame = true;
  game.value.playerX.active = false; 
  game.value.playerO.active = false;

  emit('start-game', true)
}

</script>

<template>
 <div>
    <div v-if="game.playerX.active">
      <form @submit.prevent="savePlayerX">
        <h3>Player X: </h3>
        <input type="text" placeholder="Enter your name" v-model="game.playerX.name"/>
        <button>Save</button>
      </form>
    </div>
    <div v-if="game.playerO.active">
      <form @submit.prevent="savePlayerYAndRenderGameBoard">
        <h3>Player O: </h3>
        <input type="text" placeholder="Enter your name" v-model="game.playerO.name"/>
        <button>Start Game</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>