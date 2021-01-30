<template>
  <form class="form" @submit.prevent="handleSubmit">
    <textarea @input="inputHandler" class="textarea" v-model="inputValue"></textarea>
    <button
      type="submit"
      class="button"
      :disabled="!canSendMessage"
    >
      Send
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { useField } from "../hooks/field";

export default defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(messageText: string) => void>,
      required: true,
    },
    userName: String,
  },
  setup(props) {
    const field = useField();
    const canSendMessage = ref<boolean>(true);

    const handleSubmit = () => {
      if (canSendMessage.value) {
        props.onSubmit(field.input.value.trim());
      }
    }

    const inputHandler = () => {
      canSendMessage.value = field.validate() || !props.userName;
    }

    return {
      handleSubmit,
      inputValue: field.input,
      canSendMessage,
      inputHandler,
    };
  }
})
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  display: flex;
}

.textarea,
.button {
  padding: 8px;
  height: 64px;
}

.button {
  width: 100px;
}

.textarea {
  resize: none;
  display: block;
  width: 100%;
  font-family: inherit;
  border: 1px solid lightgray;
}

</style>