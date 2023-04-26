<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <my-input v-model.trim="post.title"
              v-focus
              class="input"
              type="text"
              placeholder="Название"
    />
    <my-input v-model.trim="post.body"
              class="input"
              type="text"
              placeholder="Описание"
    />
    <my-button class="btn" @click="createPost">Создать</my-button>
  </form>
</template>

<script>

import MyInput from "./UI/MyInput.vue";

export default {
  components: {MyInput},
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('createPost', this.post)
      this.post = {
        title: '',
        body: '',
      }
    },

  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}


</style>