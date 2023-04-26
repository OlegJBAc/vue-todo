<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue education</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button style="margin-left: 20px;" @click="$router.push('/about')">About page</my-button>
      <my-button style="margin-left: 20px;" @click="$router.push('/store')">Store page</my-button>
      <my-button style="margin-left: 20px;" @click="$router.push('/compositionAPI')">Composition API page</my-button>
    </div>
  </div>

</template>

<script>
import router from "../router/router.js";

export default {
  name: "NavBar",
  methods: {
    router() {
      return router
    }
  }
}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: wheat;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>
