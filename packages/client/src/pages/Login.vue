<template>
  <form @submit.prevent="login">
    <input type="email" v-model="form.email" />
    <input type="password" v-model="form.password" />
    <p v-if="error">{{ error }}</p>
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useMainStore } from "../store";
import axios from "redaxios";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  setup() {
    const store = useMainStore();
    const router = useRouter();
    const form = reactive({
      email: "",
      password: "",
    });
    const error = ref("");

    const login = () => {
      axios
        .post("http://192.168.1.38:3001/login", form)
        .then((r) => {
          store.state.userToken = r.data;
          router.push("/");
        })
        .catch(() => {
          console.log("hello");
          error.value = "Auth failed";
        });
    };

    return { form, login, error };
  },
});
</script>
