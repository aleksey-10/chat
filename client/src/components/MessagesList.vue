<template>
  <ul class="list" ref="list">
    <li
      v-for="message in messages"
      :key="message.id"
      class="item"
      :class="{item: true, 'item--user-message': message.userName === userName}"
    >
      <span class="name">
        <strong>{{message.userName}}</strong>
      </span>
      <p class="message">{{ message.text }}</p>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
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
    },
  },
  watch: {
    messages() {
      const list = this.$refs.list as any;

      list.scroll({ top: list.scrollHeight + 48 })
    }
  }
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
    margin: 8px 0;
  }
</style>
