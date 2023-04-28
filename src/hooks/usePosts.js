import axios from "axios";
import {onMounted, ref} from "vue";

export function usePosts(limit) {
    const posts = ref([])
    const totalPages = ref(0)
    const isPostLoading = ref(true)
    const page = ref(1)
    const fetching = async () => {
        try {
            isPostLoading.value = true
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: page,
                    _limit: limit.value,
                }
            })
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value)
            posts.value = response.data
        } catch (e) {
            console.error('Request failed')
        } finally {
            isPostLoading.value = false
        }
    }

    onMounted(fetching)

    return {
        posts, isPostLoading, totalPages, page,
    }

}
