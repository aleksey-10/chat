import { ref } from "vue";

export const useField = (initialValue = '') => {
  const input = ref<string>(initialValue);

  const validate = () => Boolean(input.value.trim());

  return { input, validate };
};
