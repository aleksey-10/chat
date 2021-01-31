<template>
  <form class="form" @submit.prevent="handleSubmit">
    <input
      type="text"
      placeholder="Enter your name"
      class="input"
      v-model="userName"
    >
    <button type="Submit" class="button">OK</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { useField } from '../hooks/field';


export default defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(name: string) => void>,
      required: true,
    },
  },
  setup(props) {
    const field = useField();

    const handleSubmit = () => {
      if (field.validate()) {
        props.onSubmit(field.input.value.trim());
      }
    };

    return {
      userName: field.input,
      handleSubmit,
    };
  }
})
</script>

<style lang="scss" scoped>
  .form {
    display: flex;
    align-items: center;
  }

  .button,
  .input {
    height: 32px;
  }

  .input {
    padding: 8px 16px;
  }
</style>
