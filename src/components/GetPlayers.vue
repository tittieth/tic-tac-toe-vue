<script setup lang="ts">
import { ref } from 'vue';

const errorMsg = ref('');

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
  const usernameRegex = /^[a-zA-Z]+$/

  if (!usernameRegex.test(players.value.playerX.name && players.value.playerO.name)) {
    errorMsg.value = "Enter both usernames, letters a-z.";
    return
  } else {
    localStorage.setItem("userO", JSON.stringify(players.value.playerO.name));
    localStorage.setItem("userX", JSON.stringify(players.value.playerX.name));

    emit('start-game');
    emit('update:gameNames', {
        playerX: players.value.playerX.name,
        playerO: players.value.playerO.name
      });
  }
}

</script>

<template>
 <div class="wrapper"> 
    <span>{{ errorMsg }}</span>
    <form @submit.prevent="savePlayersToLs">
      <h3>Player X: </h3>
      <input type="text" placeholder="Enter your name" v-model="players.playerX.name"/>
      <h3>Player O: </h3>
      <input type="text" placeholder="Enter your name" v-model="players.playerO.name"/>
      <button>Start Game</button>
    </form>
  </div>
</template>

<style scoped>

.wrapper {
  height: 100vh;
  width: 100vw;
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

span {
  display: block;
  margin-top: 100px;
}

h3 {
  padding: 10px;
  margin: 10px;
  font-size: 2em;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 50px;
}

input {
  padding: 20px;
  border-radius: 8px;
  border: 1px solid transparent;
}

button {
  margin: 50px;
  padding: 20px 45px;
}

</style>