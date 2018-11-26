<template>
  <section class="index">
    <div
      class="title is-4"
      v-for="(item, index) in items" :key="index">
        <img :src="item.fields.image[0].fields.file.url" width="200">
        <h1>{{ item.fields.name }}</h1>
        <b>{{ item.fields.price }}</b>
    </div>
  </section>
</template>

<script>
import client from '~/plugins/contentful';

export default {
  asyncData({ params }) {
    return client.getEntries()
      .then(entries => {
        return { items: entries.items };
      })
      .catch(console.error);
  }
};
</script>
