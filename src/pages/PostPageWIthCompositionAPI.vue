<template>
    <div>
        <h1>Страница с постами</h1>

<!--        <my-input-->
<!--            v-model="searchQuery"-->
<!--            placeholder="Поиск..."-->
<!--            v-focus-->
<!--        />-->

<!--        <div class="app__buttons">-->
<!--            <my-button @click="showDialog">Создать пост</my-button>-->
<!--            <my-select-->
<!--                v-model="selectedSort"-->
<!--                :options="sortOptions"-->
<!--            />-->
<!--        </div>-->

<!--        <my-button @click="fetchPosts" style="margin: 15px 0">Получить посты</my-button>-->
<!--        <my-dialog v-model:show="dialogVisible">-->
<!--            <PostForm @createPost="createPost"/>-->
<!--        </my-dialog>-->

<!--        <PostList :posts="sortedAndSearchedPosts"-->
<!--                  @remove="removePost"-->
<!--                  v-if="!isPostLoading"-->
<!--        />-->
<!--        <div v-else>Идёт загрузка постов...</div>-->
<!--        <div v-intersection="loadMorePosts" class="observer"></div>-->
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
    </div>
</template>

<script>
import MyInput from "../components/UI/MyInput.vue";
import MySelect from "../components/UI/MySelect.vue";
import MyButton from "../components/UI/MyButton.vue";
import MyDialog from "../components/UI/MyDialog.vue";
import PostList from "../components/PostList.vue";
import PostForm from "../components/PostForm.vue";
import {ref} from "vue";

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
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
            ],
        }
    },
    setup(props) {
        const { totalPages, isPostLoading, posts } = usePosts(10)

        return {

        }
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
