import {createStore} from "vuex";
import axios from "axios";


export const postModule = {
    state: () => {
      return {
          posts: [],
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
    getters: {
        // sortedPosts() {
        //   return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        // }, //Не мутирует исходный массив, потому что развернули в новый массив и его сортируем.
        sortedAndSearchedPosts(state) {
            return state.posts.filter(post => post[state.selectedSort].toLowerCase().includes(state.searchQuery.toLowerCase()))
        },
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setIsPostLoading(state, isPostLoading) {
            state.isPostLoading = isPostLoading
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSortOptions(state, sortOptions) {
            state.sortOptions = sortOptions
        },
    },
    actions: {
        async fetchPosts(state, commit) {
            try {
                commit('setLoading', true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
            } catch (e) {
                console.error('Request failed')
            } finally {
                commit('setLoading', false)

            }
        },
        async loadMorePosts(state, commit) {
            try {
                commit('setPage', state.page + 1)

                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    }
                })
                commit('totalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('posts', [...state.posts, ...response.data])
            } catch (e) {
                console.error('Request failed')
            }
        },
    },
    namespaced: true,

}


