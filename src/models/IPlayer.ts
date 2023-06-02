import { Ref } from "vue";

export interface IPlayer {
    name: string | null;
    gamePoints: Ref<number>;
  }