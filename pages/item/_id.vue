<template>
	<section class="item">
    <img :src="item.fields.image[0].fields.file.url">
    <h1>{{ item.fields.name }}</h1>
    <div>
      <b>{{ item.fields.price | priceFormat }}</b>
      <nuxt-link :to="{ name: 'category-categoryId', params: { categoryId: item.fields.category }}">
      <span class="category" v-if="item.fields.category">{{ getCategoryLabel(item.fields.category) }}</span>
      </nuxt-link>
      <span v-for="(tag, index) in item.fields.tags" :key="index">
        <nuxt-link :to="{ name: 'tag-tagId', params: { tagId: tag }}">
          <span class="tag" v-if="tag">{{ getTagLabel(tag) }}</span>
        </nuxt-link>
      </span>
    </div>
    <br>
    <div>{{ item.fields.description }}</div>
  </section>
</template>

<script>
import { CATEGORY } from '~/constants/category';
import { TAG } from '~/constants/tag';
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
  },
  methods: {
    getTagLabel(tagId) {
      const tag = TAG.find(
        tag => tag.id === tagId
      )
      return tag.label;
    },
    getCategoryLabel(categoryId) {
      const category = CATEGORY.find(
        category => category.id === categoryId
      )
      return category.label;
    }
  }
};
</script>

<style>
</style>
