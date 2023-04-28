import {ref, computed} from 'vue'

export function useSortedAndSearchedPosts(sortedPosts) {
    const searchQuery = ref('')

    const sortedAndSearchedPosts = computed(() => {
        return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })

    const test = computed(() => {
        return sortedPosts
    })

    return {
        searchQuery, sortedAndSearchedPosts, test
    }
};
