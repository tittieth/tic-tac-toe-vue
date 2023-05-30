<script setup lang="ts">
import { ref } from 'vue';
import StartNewGame from './StartNewGame.vue';

const rows: number = 3;
const columns: number = 3;
const board = ref([
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
])

interface ITestProps {
  players: {
    playerX: string;
    playerO: string;
  }
}

const props = defineProps<ITestProps>();
console.log(props.players.playerX);

const gameFinished = ref(false);
const currentPlayer = ref(props.players.playerO);

console.log(currentPlayer.value);


const togglePlayer = () => {
  currentPlayer.value = currentPlayer.value === props.players.playerX ? props.players.playerO : props.players.playerX;
  console.log(currentPlayer.value);
}

// const setInitialPlayer = () => {
//   currentPlayer.value = Math.random() < 0.5 ? props.players.playerX : props.players.playerO;
//   console.log(currentPlayer.value);
  
// }; 

const calculateWinner = board => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (board[a] && board[a] === board[b] && board[a] === board[c]){
      gameFinished.value = true;
      return board[a]
    }  
  }
  togglePlayer();
  return null;
}


const makeMove = (e: Event) => {
    if (gameFinished.value === true) {
      return;
    }

    const target = e.target as HTMLElement;
    const row = Number(target.dataset.row);
    const column = Number(target.dataset.column);
    console.log('row:', row);
    console.log('column:', column);

    if (board.value[row][column] !== "") {
      return;
    }
    
    target.innerHTML = currentPlayer.value === props.players.playerX ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-circle"></i>';
    board.value[row][column] = currentPlayer.value === props.players.playerX ? 'X' : 'O';
    console.log(board.value); 

    calculateWinner(board.value.flat());
}

const playAgain = () => {
    board.value = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.innerHTML = ''; 
  });

  gameFinished.value = false;
  togglePlayer();
  
  console.log(board.value);
}

// setInitialPlayer();

</script>

<template>
  <h2 v-if="gameFinished">Winner: {{ currentPlayer }}</h2>
    <h1 v-if="!gameFinished">Players move: {{ currentPlayer }}</h1>
    <div class="game-board">
        <div v-for="(row, i) in rows" :key="i" class="row">
            <div @click="makeMove" v-for="(column, index) in columns" :key="index" class="cell"
                :data-column="index" :data-row="i" :disabled="gameFinished">
            </div>
        </div>
    </div>
    <StartNewGame @empty-board="playAgain"></StartNewGame>
</template>


<style scoped>
.game-board {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.row {
    display: flex;
}

.cell {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.fa-xmark {
    color: lightcoral;
    font-size: 2rem;
}

.fa-circle {
    color: lightskyblue;
    font-size: 2rem;
}
</style>