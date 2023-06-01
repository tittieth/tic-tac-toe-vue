<template>
    <div class="banner">
        <div class="wrapper">
                <span><i class="fas fa-times sign sign__x"></i></span>
                <span>TIC</span>
                <span>TAC</span>
                <span>TOE</span>
                <span><i class="far fa-dot-circle sign sign__o"></i></span>
            </div>
            <div class="text__play" @click="$emit('click:play')">
                <button class="hover-pointer" @click="handleClick">PLAY</button>
            </div>
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['handlePlayBtn']);

const handleClick = () => {
    emit('handlePlayBtn')
}

</script>

<style scoped>
.banner {
    width: 100vw;
    height: 100vh;
    z-index: 1; 
    background: rgb(240,194,226);
    background: linear-gradient(148deg, rgba(240,194,226,1) 0%, rgba(174,226,241,1) 71%, rgba(170,235,200,1) 100%);
    /* transition: top 1s; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.visible {
    top: 0;
    transition: top 1s;
}

span {
 -webkit-text-stroke-width: 1.25px;
-webkit-text-stroke-color: #000;
font-size: 80px;
text-shadow: 0 0px #f3c623, 0 0px #f2aaaa;
transform: translate(0, 100%) rotate(4deg);
animation: jump 2s ease-in-out;
display: inline-block;
font-family: "Titan One", cursive;
color: #fff;
    @media screen and (max-width: 576px) {
        font-size: 70px;
    }
}
.sign {
    font-size: 90px;
    @media screen and (max-width: 576px) {
        font-size: 40px;
    }
}

.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  top: -100px;
  width: 100vw;
  text-align: center;
  @media screen and (max-height: 200px) {
    transform: scale(0.3,0.3);
  }
}

button {
    margin-top: 40px;
    padding: 25px 95px;
}

</style>