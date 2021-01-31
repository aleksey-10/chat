<template>
  <form class="form" @submit.prevent="handleSubmit">
    <textarea
      @input="inputHandler"
      class="textarea"
      v-model="inputValue"
      @keyup.enter="handleSubmit"
      placeholder="You message..."
    ></textarea>
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
import { defineComponent, PropType, ref, toRefs, watch } from "vue";
import { useField } from "../hooks/field";

export default defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(messageText: string) => void>,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const field = useField();
    const { userName } = toRefs(props);
    const canSendMessage = ref<boolean>(Boolean(userName.value));

    const handleSubmit = () => {
      if (canSendMessage.value) {
        props.onSubmit(field.input.value.trim());
        field.reset();
      }
    }

    const checkCanSendMessage = () => {
      canSendMessage.value = field.validate() && Boolean(userName.value);
    };

    watch(userName, checkCanSendMessage);

    const inputHandler = checkCanSendMessage;

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
  border: none;
  border-top: var(--border);
}

</style>