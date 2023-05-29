<script setup lang="ts">
import { ref } from 'vue';

const rows: number = 3;
const columns: number = 3;
const board: { value: string[][] } = ref([]);

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


const makeMove = (e: Event) => {
    emit('do-it')
    const target = e.target as HTMLElement;
    target.innerHTML = props.currentPlayer === props.players.playerX ? 'X' : 'O';;
    const row = Number(target.dataset.row);
    const column = Number(target.dataset.column);
    console.log('row:', row);
    console.log('column:', column);
    board.value[row][column] = props.currentPlayer === props.players.playerX ? 'X' : 'O';
    console.log(board.value);
    
}

const emit = defineEmits(['do-it']);

emit('do-it')

// const handleClick = (e: Event) => {
//     emit('do-it', e)
// }

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
</style>