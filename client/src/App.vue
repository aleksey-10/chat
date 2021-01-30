<template>
  <div class="chat">
    <main class="chat__settings">
      <h1>Welcome, {{userName || 'guest'}}</h1>
      <name-input v-if="!userName" @submit="newNameHandler"></name-input>
      <button v-else @click="handleLogout">Change name</button>
    </main>
    <aside class="chat__messages">
      <messages-list :userName="userName" :messages="messages"></messages-list>
      <message-input :userName="userName" @submit="addMessage"></message-input>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import MessagesList from './components/MessagesList.vue';
import NameInput from './components/NameInput.vue';
import MessageInput from './components/MessageInput.vue';
import { useUserName } from './hooks/userName';
import Message from './interfaces/Message';

//interface Messages {
//  data: Message[];
//}

export default defineComponent({
  name: 'App',
  components: {
    MessagesList,
    MessageInput,
    NameInput,
  },
  setup() {
    const { userName, handleLogout, newNameHandler } = useUserName();
    const messages = reactive<Message[]>([]);

    onMounted(() => {
      fetch('http://localhost:5000/api/chat')
        .then(res => res.json())
        .then(data => messages.push(...data.messages));
    });

    const addMessage = (text: string) => {
      messages.push({ id: Date.now(), userName: userName.value, text });
      console.log(text);
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

button {
  cursor: pointer;
  padding: 8px;
}

.chat {
  display: flex;
  justify-content: flex-end;
  height: 100%;

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
    border: 1px solid #e3e3e3;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    &__settings {
      height: auto;
      flex-grow: 0;
      margin-bottom: 16px;
      overflow: hidden;
    }

    &__messages {
      flex-grow: 1;
      max-width: unset;
    }
  }
}
</style>