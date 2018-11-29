<template>
  <section class="index">
    <h2 class="category">{{ label }}</h2>
    <div
      class="item"
      v-for="(item, index) in items" :key="index">
          <nuxt-link :to="{ name: 'item-id', params: { id: item.fields.id }}">
          <img :src="item.fields.image[0].fields.file.url">
            <h1>{{ item.fields.name }}</h1>
         </nuxt-link>
           <b>{{ item.fields.price | priceFormat }}</b>
          <span class="category" v-if="item.fields.category">{{ item.fields.category }}</span>
          <span v-for="(tag, index) in item.fields.tags" :key="index">
            <span class="tag" v-if="tag">{{ tag }}</span>
          </span>
    </div>
  </section>
</template>

<script>
import client from '~/plugins/contentful';

export default {
  asyncData({ params }) {
    return client.getEntries({
      'content_type' : 'item',
      'fields.category[in]': params.category,
      order: '-sys.createdAt'
    }).then(entries => {
        return {
          items: entries.items,
          label: params.category
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
img {
  width: 100%;
  text-align: center
}

.item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding: 20px;
}

.item > a {
  text-decoration: none;
  color: #555;
}

h1 {
  font-size: 2em;  
}

.category {
  background-color: #ccc;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
}

.tag {
  background-color: yellow;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
}

b {
  font-size: 1.5em;
}
</style>
