<script setup lang="ts">
import { ref } from 'vue';

const rows: number = 3;
const columns: number = 3;
const board: { value: string[][] } = ref([]);

const gameFinished = ref(false);

interface ITestProps {
  players: {
    playerX: string;
    playerO: string;
  };
  currentPlayer: string;
}

const props = defineProps<ITestProps>();
console.log('props ' + props.currentPlayer);


for (let i = 0; i < rows; i++) {
  board.value.push(Array(columns).fill(''));
}

console.log('board' + board);

const emit = defineEmits(['do-it']);


const makeMove = (e: Event) => {
    const target = e.target as HTMLElement;
    const row = Number(target.dataset.row);
    const column = Number(target.dataset.column);
    console.log('row:', row);
    console.log('column:', column);

    if (board.value[row][column] !== '') {
      return;
    }
    
    target.innerHTML = props.currentPlayer === props.players.playerX ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-circle"></i>';
    board.value[row][column] = props.currentPlayer === props.players.playerX ? 'X' : 'O';
    console.log(board.value);  
    emit('do-it')


    if (calculateWinner(row, column, props.currentPlayer)) {
        console.log("winner is " + props.currentPlayer);
    } 
}

// const isBoardFull = (): boolean => {
//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < columns; j++) {
//       if (board.value[i][j] === '') {
//         return false; // Om det finns minst en tom ruta, är brädet inte fullt
//       }
//     }
//   }
//   return true; // Om inga tomma rutor hittas är brädet fullt
// }

emit('do-it')

const calculateWinner = (row: number, column: number, player: string): boolean => {
  // Check horizontal
  if (
    board.value[row][0] === player &&
    board.value[row][1] === player &&
    board.value[row][2] === player
  ) {
    return true;
  }

  // Check vertical
  if (
    board.value[0][column] === player &&
    board.value[1][column] === player &&
    board.value[2][column] === player
  ) {
    return true;
  }

  // Check diagonal
    if (
        (board.value[0][0] === player &&
        board.value[1][1] === player &&
        board.value[2][2] === player) ||
        (board.value[0][2] === player &&
        board.value[1][1] === player &&
        board.value[2][0] === player)
    ) {
        return true;
        
    }

  return false;
}

</script>

<template>
    <div class="game-board">
        <div v-for="(row, i) in rows" :key="i" class="row">
            <div @click="makeMove" v-for="(column, index) in columns" :key="index" class="cell"
                :data-column="index" :data-row="i">
            </div>
        </div>
    </div>
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