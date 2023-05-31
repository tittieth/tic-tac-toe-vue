<script setup lang="ts">
import { ref } from 'vue';

const players = ref({
    playerX: {
      name: '',
    },
    playerO: {
      name: '',
    }
  });

const emit = defineEmits(['start-game', 'update:gameNames']);

const savePlayersToLs = () => {
  localStorage.setItem("userO", players.value.playerO.name);
  localStorage.setItem("userX", players.value.playerX.name);

  emit('start-game')
  emit('update:gameNames', {
      playerX: players.value.playerX.name,
      playerO: players.value.playerO.name
    });
}

</script>

<template>
 <div>
    <div>
      <form @submit.prevent="savePlayersToLs">
        <h3>Player X: </h3>
        <input type="text" placeholder="Enter your name" v-model="players.playerX.name"/>
        <h3>Player O: </h3>
        <input type="text" placeholder="Enter your name" v-model="players.playerO.name"/>
        <button>Start Game</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>