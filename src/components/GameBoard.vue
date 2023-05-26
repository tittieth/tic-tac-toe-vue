<script setup lang="ts">
import { ref } from 'vue';

const rows: number = 3;
const columns: number = 3;
const board: { value: string[][] } = ref([]);

for (let i = 0; i < rows; i++) {
  board.value.push(Array(columns).fill(''));
}


</script>

<template>
    <div>
        <h1>Tic tac toe</h1>
    </div>
    <div class="game-board">
        <div v-for=" row in rows" :key="row" class="row">
            <div v-for="column in columns" :key="column" class="cell">
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