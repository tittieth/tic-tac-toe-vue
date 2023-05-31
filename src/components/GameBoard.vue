<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PlayAgain from './PlayAgain.vue';
import ScoreBoard from './ScoreBoard.vue';
import EndGame from './EndGame.vue';

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

      if (savedBoard) {
        board.value = JSON.parse(savedBoard);
        console.log(board.value);
      } if (savedPlayer) {
        currentPlayer.value = JSON.parse(savedPlayer);
      } else { 
        togglePlayer();
      }
    };


onMounted(() => {
  loadSavedGame();
});

const winner = ref<string[]>([]);
const tie = ref(false);
const history = ref<string[]>([]);

interface ITestProps {
  players: {
    playerX: string;
    playerO: string;
  }
}

const props = defineProps<ITestProps>();
console.log(props.players.playerX);

const gameFinished = ref(false);
const currentPlayer = ref('');

const togglePlayer = () => {
  console.log(currentPlayer.value);
  console.log(props.players.playerO);
  
  currentPlayer.value = currentPlayer.value === props.players.playerX ? props.players.playerO : props.players.playerX;
  console.log(props.players.playerO);
  console.log(currentPlayer.value);
  localStorage.setItem('currentPlayer', JSON.stringify(currentPlayer.value));
}

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

  console.log(currentPlayer.value);

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (board[a] && board[a] === board[b] && board[a] === board[c]){
      gameFinished.value = true;
      winner.value.push(currentPlayer.value);
      history.value.push(currentPlayer.value);
      console.log(winner.value);
      console.log(currentPlayer.value);
      
      return board[a]
    }  
  }

  if (isBoardFull()) {
    tie.value = true;
    console.log('oavgjort');
  }

  togglePlayer();
  return null;
}

const makeMove = (e: Event) => {
    if (gameFinished.value === true) {
      return;
    }
    console.log(currentPlayer.value);
    
    const target = e.target as HTMLElement;
    const row = Number(target.dataset.row);
    const column = Number(target.dataset.column);
    console.log('row:', row);
    console.log('column:', column);

    if (board.value[row][column] !== "") {
      return;
    }
    
    const playerMark = currentPlayer.value === props.players.playerX ? 'X' : 'O';
    board.value[row][column] = playerMark;
    console.log(currentPlayer.value);
    localStorage.setItem('board', JSON.stringify(board.value));
    console.log(board.value); 
    console.log(currentPlayer.value);

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
  
  console.log(board.value);
  console.log(currentPlayer.value); 
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
  console.log('endGame');
  emits('end-game')
}

</script>

<template>
    <h2 v-if="gameFinished">Winner: {{ currentPlayer }}</h2>
    <h2 v-if="tie">It's a tie!</h2>
    <h1 v-if="!gameFinished">Players move: {{ currentPlayer }}</h1>
    <div class="game-board">
        <div v-for="(row, i) in rows" :key="i" class="row">
            <div @click="makeMove" v-for="(column, index) in columns" :key="index" class="cell"
                :data-column="index" :data-row="i" :disabled="gameFinished">
                <span v-if="board[i][index] === 'X'" class="fa-solid fa-xmark"></span>
                <span v-else-if="board[i][index] === 'O'" class="fa-solid fa-circle"></span>
            </div>
        </div>
    </div>
    <PlayAgain @empty-board="playAgain"></PlayAgain>
    <EndGame @end-game="handleClick"></EndGame>
    <ScoreBoard :history="history"></ScoreBoard>
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