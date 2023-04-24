<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-button @click="showDialog" style="margin: 15px 0">Создать пост</my-button>
    <my-dialog v-model:show="dialogVisible">
      <PostForm @createPost="createPost"/>
    </my-dialog>

    <PostList :posts="posts"
              @remove="removePost"
    />

  </div>

</template>

<script>

import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";
import MyDialog from "./components/UI/MyDialog.vue";
import MyButton from "./components/UI/MyButton.vue";

export default {
  components: {
    MyButton,
    MyDialog,
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [
        {id: 1, title: 'JavaScript 1', body: 'Описание поста'},
        {id: 2, title: 'JavaScript 2', body: 'Описание поста'},
        {id: 3, title: 'JavaScript 3', body: 'Описание поста'},
        {id: 4, title: 'JavaScript 4', body: 'Описание поста'},
      ],
      dialogVisible: false,
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(postItem => postItem.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },

  }
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

</style>
