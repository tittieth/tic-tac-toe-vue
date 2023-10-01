<script setup lang="ts">
const emit = defineEmits(["handlePlayBtn"]);

const handleClick = () => {
  emit("handlePlayBtn");
};
</script>

<template>
  <div class="banner">
    <div class="wrapper">
      <span><i class="fas fa-times sign sign__x"></i></span>
      <span>TIC</span>
      <span>TAC</span>
      <span>TOE</span>
      <span><i class="far fa-dot-circle sign sign__o"></i></span>
    </div>
    <div>
      <button @click="handleClick">PLAY</button>
    </div>
  </div>
</template>

<style scoped>
.banner {
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgb(240, 194, 226);
  background: linear-gradient(
    148deg,
    rgba(240, 194, 226, 1) 0%,
    rgba(174, 226, 241, 1) 71%,
    rgba(170, 235, 200, 1) 100%
  );
  transition: top 1s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

span {
  -webkit-text-stroke-width: 1.25px;
  -webkit-text-stroke-color: #000;
  font-size: 100px;
  text-shadow: 0 0px #c6a664, 0 0px #f2aaaa;
  transform: translate(0, 100%) rotate(4deg);
  animation: jump 2s ease-in-out;
  display: inline-block;
  font-family: "Titan One", cursive;
  color: #f0c2e2;
  @media screen and (max-width: 576px) {
    font-size: 70px;
  }
}

span:nth-child(2) {
  margin-left: -120px;
  margin-bottom: -20px;
  margin-top: -70px;
  @media screen and (max-width: 576px) {
    margin-top: -40px;
  }
}

span:nth-child(3) {
  color: #aaebc8;
}

span:nth-child(4) {
  color: #aee2f1;
  margin-left: 120px;
  margin-top: -20px;
  z-index: 5;
}
.sign {
  display: block;
  font-size: 150px;
  @media screen and (max-width: 576px) {
    font-size: 80px;
  }
}

.sign__o {
  margin-left: 350px;
  margin-bottom: -70px;
  @media screen and (max-width: 576px) {
    margin-left: 280px;
    margin-bottom: -20px;
  }
}

.sign__x {
  margin-left: -320px;
  margin-top: 20px;
  color: #aaebc8;
  @media screen and (max-width: 576px) {
    margin-left: -250px;
    margin-top: 40px;
  }
}

.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  top: -140px;
  width: 100vw;
  text-align: center;
  @media screen and (max-height: 200px) {
    transform: scale(0.3, 0.3);
  }
}

button {
  margin-top: 50px;
  padding: 25px 95px;
  background-color: rgb(240, 194, 226, 0.8);
  border: 1px solid black;
}

button:hover {
  background-color: #aaebc8;
}

@keyframes jump {
  33% {
    text-shadow: 0 60px #c6a664, 0 150px #f0c2e2;
  }
  50% {
    transform: translate(0, 0) rotate(-4deg);
    text-shadow: 0 0px #aaebc8, 0 0px whitesmoke;
  }
  66.67% {
    text-shadow: 0 -60px #c6a664, 0 -150px whitesmoke;
  }
}
</style>
