import { ref } from "vue";

export const useField = (initialValue = '') => {
  const input = ref<string>(initialValue);

  const validate = () => Boolean(input.value.trim());

  const reset = () => input.value = '';

  return { input, validate, reset };
};
