<template>
	<section class="item">
    <img :src="item.fields.image[0].fields.file.url">
    <h1>{{ item.fields.name }}</h1>
    <div>
      <b>{{ item.fields.price | priceFormat }}</b>
      <span class="category" v-if="item.fields.category">{{ item.fields.category }}</span>
      <span v-for="(tag, index) in item.fields.tags" :key="index">
        <span class="tag" v-if="tag">{{ tag }}</span>
      </span>
    </div>
    <br>
    <div>{{ item.fields.description }}</div>
  </section>
</template>

<script>
import client from '~/plugins/contentful';

export default {
  asyncData({ params }) {
    return client.getEntries({
      'content_type' : 'item',
      'fields.id': params.id
    }).then(entries => {
        console.log(entries.items[0]);
        return { 
          item: entries.items[0]
        };
      })
      .catch(console.error);
  },
  filters: {
    priceFormat: function (value) {
      return '￥' + value.toLocaleString() ;
    }
  }  
};
</script>

<style>
</style>
