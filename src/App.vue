<template>
  <div class="app">
    <h1>Страница с постами</h1>

<!--    <my-input-->
<!--      v-model="searchQuery"-->
<!--      placeholder="Поиск..."-->
<!--    />-->

    <div class="app__buttons">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>

    <my-button @click="fetchPosts" style="margin: 15px 0">Получить посты</my-button>
    <my-dialog v-model:show="dialogVisible">
      <PostForm @createPost="createPost"/>
    </my-dialog>

    <PostList :posts="sortedPosts"
              @remove="removePost"
              v-if="!isPostLoading"
    />
    <div v-else>Идёт загрузка постов...</div>

  </div>

</template>

<script>

import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";
import MyDialog from "./components/UI/MyDialog.vue";
import MyButton from "./components/UI/MyButton.vue";
import axios from "axios";
import MySelect from "./components/UI/MySelect.vue";
import MyInput from "./components/UI/MyInput.vue";

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      // searchQuery: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ],
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
    async fetchPosts() {
      try {
        this.isPostLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        this.posts = response.data
        this.isPostLoading = false
      } catch (e) {
        console.error('Request failed')
      }
    },
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    // sortedAndSearchedPosts() {
    //   return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    // },
  },// Не мутирует исходный массив, потому что развернули в новый массив и его сортируем.
// /*  watch: {
//     selectedSort(newValue) {
//       this.posts.sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
//     }
//   },// Мутирует исходный массив.*/
  mounted() {
    this.fetchPosts()
  },
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

.app__buttons {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

</style>
