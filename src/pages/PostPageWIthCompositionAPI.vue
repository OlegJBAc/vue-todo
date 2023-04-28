<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
            v-model="searchQuery"
            placeholder="Поиск...."
            v-focus
        />
        <div>{{ test }}</div>

        <div class="app__btns">
            <my-button
            >
                Создать пользователя
            </my-button>
            <my-select

                :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form
            />
        </my-dialog>
        <post-list
            :posts="sortedAndSearchedPosts"
            v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
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
import {usePosts} from "../hooks/usePosts.js";
import {useSortedAndSearchedPosts} from "../hooks/useSortedAndSearchedPosts.js";
import axios from "axios";
import {useLoadMorePosts} from "../hooks/useLoadMorePosts.js";

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

        const limit = ref(10)

        const {posts, totalPages, isPostsLoading, page} = usePosts(limit);
        const {searchQuery, sortedAndSearchedPosts, test} = useSortedAndSearchedPosts(posts)

console.log(page)

        const {loadMorePosts} = useLoadMorePosts({ posts, page, limit, totalPages })

        return {
            posts,
            totalPages,
            isPostsLoading,
            searchQuery,
            sortedAndSearchedPosts,
            page,
            test,
            loadMorePosts,
        }
    }
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
