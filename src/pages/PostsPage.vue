<template>
  <h1>Страница с постами</h1>

  <my-input
      v-model="searchQuery"
      placeholder="Поиск..."
  />

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

  <PostList :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isPostLoading"
  />
  <div v-else>Идёт загрузка постов...</div>
  <div ref="observer" class="observer"></div>
  <!--    <div class="page__wrapper">-->
  <!--      <div v-for="pageNumber in totalPages"-->
  <!--           :key="pageNumber"-->
  <!--           class="page"-->
  <!--           :class="{-->
  <!--             'current-page': page === pageNumber,-->
  <!--           }"-->
  <!--           @click="changePage(pageNumber)"-->
  <!--      >{{ pageNumber }}-->
  <!--      </div>-->
  <!--    </div>-->
</template>

<script>
import MyInput from "../components/UI/MyInput.vue";
import MySelect from "../components/UI/MySelect.vue";
import MyButton from "../components/UI/MyButton.vue";
import MyDialog from "../components/UI/MyDialog.vue";
import PostList from "../components/PostList.vue";
import PostForm from "../components/PostForm.vue";
import axios from "axios";

export default {
  name: "PostsPage",
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
      selectedSort: 'title',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
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
    // changePage(pageNumber) {
    //   this.page = pageNumber
    // },
    async fetchPosts() {
      try {
        this.isPostLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        console.error('Request failed')
      } finally {
        this.isPostLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        console.error('Request failed')
      }
    },
  },
  computed: {
    // sortedPosts() {
    //   return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    // },
    sortedAndSearchedPosts() {
      return this.posts.filter(post => post[this.selectedSort].toLowerCase().includes(this.searchQuery.toLowerCase()))
    },
  }, //Не мутирует исходный массив, потому что развернули в новый массив и его сортируем.
  watch: {
    // selectedSort(newValue) {
    //   this.posts.sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    // },// Мутирует исходный массив.
    // page() {
    //   this.fetchPosts()
    // },

  },
  mounted() {
    this.fetchPosts()

    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if(entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
      }
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)
  },
}
</script>

<style scoped>
.observer {
  height: 30px;
}
.app__buttons {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}

.current-page {
  border: 2px solid teal;
}
</style>