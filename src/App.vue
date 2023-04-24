<template>
  <div class="app">
    <PostForm @createPost="createPost"/>
    <PostList :posts="posts"/>


  </div>

</template>

<script>

import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";

export default {
  components: {
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
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
    }

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
