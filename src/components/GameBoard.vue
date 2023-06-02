<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import PlayAgain from './PlayAgain.vue';
import ScoreBoard from './ScoreBoard.vue';
import EndGame from './EndGame.vue';
import { IPlayer } from '../models/IPlayer';

const winner = ref<string[]>([]);
const tie = ref(false);
const history = ref<string[]>([]);
const rows: number = 3;
const columns: number = 3;
const board = ref<string[][]>([
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
])

const loadSavedGame = () => {
      const savedBoard = localStorage.getItem('board');
      const savedPlayer = localStorage.getItem('currentPlayer');
      const savedHistory = localStorage.getItem('history');

      if (savedBoard) {
        board.value = JSON.parse(savedBoard);
        calculateWinner(board.value.flat());
      } if (savedHistory) { 
        history.value = JSON.parse(savedHistory)
      } if (savedPlayer) {
        currentPlayer.value = JSON.parse(savedPlayer);
       } else { 
           togglePlayer();
       }
    };

const playerX: IPlayer = {
  name: JSON.parse(localStorage.getItem('userX') || 'null'),
  gamePoints: ref(Number(localStorage.getItem('pointsUserX')) || 0),
};

const playerO: IPlayer = {
  name: JSON.parse(localStorage.getItem('userO') || 'null'),
  gamePoints: ref(Number(localStorage.getItem('pointsUserO')) || 0),
};

const gameFinished = ref(false);
const currentPlayer = ref<string | null>();

const togglePlayer = () => { 
  currentPlayer.value = currentPlayer.value === playerX.name ? playerO.name : playerX.name;
  localStorage.setItem('currentPlayer', JSON.stringify(currentPlayer.value));
}

const calculateWinner = (board: string[]): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (board[a] && board[a] === board[b] && board[a] === board[c]){
      gameFinished.value = true;
      winner.value.push(currentPlayer.value as string);
      history.value.push(currentPlayer.value as string);
      localStorage.setItem('history', JSON.stringify(history.value));
     
      playerX.gamePoints.value = currentPlayer.value === playerX.name ? playerX.gamePoints.value + 1: playerX.gamePoints.value;
      playerO.gamePoints.value = currentPlayer.value === playerO.name ? playerO.gamePoints.value + 1 : playerO.gamePoints.value;
      localStorage.setItem('pointsUserX', JSON.stringify(playerX.gamePoints.value));
      localStorage.setItem('pointsUserO', JSON.stringify(playerO.gamePoints.value));
      return board[a]
    }  
  }

  if (isBoardFull()) {
    tie.value = true;
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

    if (board.value[row][column] !== "") {
      return;
    }
    
    const playerMark = currentPlayer.value === playerX.name? 'X' : 'O';
    board.value[row][column] = playerMark;
    localStorage.setItem('board', JSON.stringify(board.value));

    calculateWinner(board.value.flat());
}

const playAgain = () => {
    board.value = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  gameFinished.value = false;
  tie.value = false;
}

const isBoardFull = () => {
  for (let row = 0; row < board.value.length; row++) {
    for (let col = 0; col < board.value[row].length; col++) {
      if (board.value[row][col] === '') {
        return false; 
      }
    }
  }
  return true; 
};

const emits = defineEmits(["end-game"]);

const handleClick = () => {
  emits('end-game')
}

onMounted(() => {
  loadSavedGame();
});

</script>

<template>
  <div class="wrapper">
    <div>
      <h2 v-if="gameFinished">Winner: {{ currentPlayer }} 🥳</h2>
      <h2 v-if="tie">It's a tie!<br> Nobody won!</h2>
      <h1 v-if="!gameFinished && !tie">Players move: {{ currentPlayer }}</h1>
      <div class="game-board">
          <div v-for="(row, i) in rows" :key="i" class="row">
              <div @click="makeMove" @keyup.enter="makeMove" v-for="(column, index) in columns" :key="index" class="cell"
                  :data-column="index" :data-row="i" :disabled="gameFinished" :tabindex="gameFinished || tie ? -1 : 0">
                  <span v-if="board[i][index] === 'X'" class="fa-solid fa-xmark"></span>
                  <span v-else-if="board[i][index] === 'O'" class="fa-solid fa-circle"></span>
              </div>
          </div>
      </div>
      <PlayAgain @empty-board="playAgain" class="btn"></PlayAgain>
      <EndGame @end-game="handleClick"></EndGame>
    </div>
    <div>
      <ScoreBoard :history="history" :playerX="playerX" :playerO="playerO"></ScoreBoard>
    </div>
  </div>
</template>


<style scoped>
h1 {
  font-size: 1.5rem;
}

h2 {
  font-size: 2.5rem;
}
.wrapper {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  background-color: lightblue;
  @media screen and (max-width: 1220px) {
    flex-direction: column;
  }
}

.game-board {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
}

.row {
    display: flex;
}

.cell {
    width: 100px;
    height: 100px;
    background-color: white;
    border: 1px solid #aaebc8;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.fa-xmark {
    color: #f0c2e2;
    font-size: 2rem;
}

.fa-circle {
    color: #aaebc8;
    font-size: 2rem;
}

.btn {
  margin-bottom: 20px;
}
</style>