import { ref } from "vue";

export const componentKey = ref(0);
export function forceRerender(){
  componentKey.value += 1;
};