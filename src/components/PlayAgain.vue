<template>
    <div>
        <button @click.prevent="newGame">Play again</button>
    </div>
</template>

<script setup lang="ts">

const emits = defineEmits(["empty-board"]);
    
 const newGame = () => {
    emits("empty-board")
 }
</script>

<style scoped>

</style>