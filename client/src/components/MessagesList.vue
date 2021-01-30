<template>
  <ul class="list">
    <li
      v-for="message in messages"
      :key="message.id"
      class="item"
      :class="{item: true, 'item--user-message': message.userName === userName}"
    >
      <small class="name">
        <strong>{{message.userName}}</strong>
      </small>
      <p class="message">{{ message.text }}</p>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import Message from '../interfaces/Message';

export default defineComponent({
  props: {
    userName: {
      type: String,
      required: true,
    },
    messages: {
      type: Array as PropType<Message[]>,
      required: true,
    }
  },
});
</script>

<style lang="scss" scoped>
  .list {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
    padding: 8px 16px;
    flex-grow: 1;
    overflow: auto;
  }

  .item {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }

    &--user-message {
      text-align: right;
    }
  }

  .message {
    font-size: 0.75rem;
  }
</style>
