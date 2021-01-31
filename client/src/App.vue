<template>
  <div class="chat">
    <main class="chat__settings">
      <h1>Welcome, {{userName || 'guest'}}</h1>
      <name-input v-if="!userName" @submit="newNameHandler"></name-input>
      <button v-else @click="handleLogout">Log out</button>
    </main>
    <aside class="chat__messages">
      <messages-list :userName="userName" :messages="messages"></messages-list>
      <message-input :userName="userName" @submit="addMessage"></message-input>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import MessagesList from './components/MessagesList.vue';
import NameInput from './components/NameInput.vue';
import MessageInput from './components/MessageInput.vue';
import { useUserName } from './hooks/userName';
import Message from './interfaces/Message';
import { io } from 'socket.io-client';

export default defineComponent({
  name: 'App',
  components: {
    MessagesList,
    MessageInput,
    NameInput,
  },
  setup() {
    const { userName, handleLogout, newNameHandler } = useUserName();
    const messages = ref<Message[]>([]);
    const url = `radiant-stream-54409.herokuapp.com`;
    const socket = io(`wss://${url}`);

    onMounted(() => {
      fetch(`https://${url}/api/chat`)
        .then(res => res.json())
        .then(data => messages.value = data.messages);
    });

    socket.on('message', (message: Message) => {
      messages.value = [...messages.value, message];
    });

    const addMessage = (text: string) => {
      socket.emit('message', {text, userName: userName.value });
    };

    return {
      userName,
      handleLogout,
      newNameHandler,
      messages,
      addMessage,
    };
  },
});
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}

html {
  font-size: 16px;
}

body {
  margin: 0;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

:root {
  --border: 1px solid #7ca7d3;
  --primary-color: #d7e4f1;
  --primary-color-dark: #7ca7d3;
}

button,
input {
  border: var(--border);
}

button {
  cursor: pointer;
  border-radius: 0;
  background-color: var(--primary-color);
  padding: 8px;
  transition: background-color 0.3s;
  text-transform: uppercase;

  &:hover:not([disabled]) {
    background-color: var(--primary-color-dark);
    color: #fff;
  }
}

.chat {
  display: flex;
  justify-content: flex-end;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;

  &__settings {
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__messages {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    width: 100%;
    border: var(--border);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: space-between;

    &__settings {
      flex-grow: 0;
      height: auto;
      margin: 16px 0;

      h1 {
        display: none;
      }
    }

    &__messages {
      flex-grow: 1;
      max-width: unset;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
