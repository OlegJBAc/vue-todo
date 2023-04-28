import axios from "axios";


export const useLoadMorePosts = ({ posts, page, limit, totalPages }) => {

     const loadMorePosts = async () => {
         if(posts.value.length === 0) return
        try {
            page.value += 1
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: page.value,
                    _limit: limit.value,
                }
            })
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value)
            posts.value = [...posts.value, ...response.data]
        } catch (e) {
            console.error('Request failed')
        }
    }
    return {
         loadMorePosts,
    }
}
