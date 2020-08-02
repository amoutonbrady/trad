<template>
  <div class="home">
    <img alt="Vue logo" src="/@assets/logo.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "redaxios";
import { useMainStore } from "../store";

export default defineComponent({
  name: "Home",
  setup() {
    const store = useMainStore();
    axios
      .get("http://192.168.1.38:3001/users", {
        auth: `Bearer ${store.state.userToken}`,
      })
      .then(console.log)
      .catch(console.error);
  },
});
</script>
