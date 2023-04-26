import axios from "axios";
import {onMounted, ref} from "vue";

export function usePosts(limit) {
    const posts = ref([])
    const totalPages = ref(0)
    const isPostLoading = ref(true)
    const fetching = async () => {
        try {
            this.isPostLoading = true
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: this.page,
                    _limit: limit,
                }
            })
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
            posts.value = response.data
        } catch (e) {
            console.error('Request failed')
        } finally {
            isPostLoading.value = false
        }
    }

    onMounted(fetching)

    return {
        posts, isPostLoading, totalPages,
    }

}
