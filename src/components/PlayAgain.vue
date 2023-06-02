<script setup lang="ts">

const emits = defineEmits(["empty-board"]);
    
 const newGame = () => {
    emits("empty-board")
 }
</script>

<template>
    <div>
        <button @click.prevent="newGame">Play again</button>
    </div>
</template>

<style scoped>
button {
    padding: 15px 30px;
}
</style>