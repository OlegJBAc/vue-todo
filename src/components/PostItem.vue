<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <my-button @click="$router.push(`/posts/${post.id}`)"
               @remove="$emit('remove', post)"
    >
      Открыть
    </my-button>
    <my-button @click="$emit('remove', post)"
               @remove="$emit('remove', post)"
    >
      Удалить
    </my-button>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    post: {
      type: Object,
      required: true,
    }
  },

}
</script>

<style scoped>
.post {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}
.post__btns {
  display: flex;
}
</style>