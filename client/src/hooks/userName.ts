import { ref } from "vue";

export const useUserName = () => {
  const userName = ref<string>(localStorage.getItem('userName') || '');

  const handleLogout = () => {
    userName.value = '';
    localStorage.removeItem('userName');
  };

  const newNameHandler = (newName: string) => {
    userName.value = newName;
    localStorage.setItem('userName', newName);
  };

  return {
    userName,
    handleLogout,
    newNameHandler,
  };
}
