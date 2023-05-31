<template>
    <div>
        <div>
         <button @click="endGame">End Game</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    const emits = defineEmits(["end-game"]);
    
    const endGame = () => {
       emits("end-game")
    }   

</script>

<style scoped>

</style>