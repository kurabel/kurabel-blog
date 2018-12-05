<template>
  <section class="index">
    <div>並び替え</div>
    <ul>
      <li @click="sortItem('ALL')">すべてを表示</li>
      <li @click="sortItem('NEW')">新着商品</li>
      <li @click="sortItem('SOON')">まもなく終了（to do）</li>
      <li @click="sortItem('LOW')">価格が安い順</li>
      <li @click="sortItem('HIGH')">価格が高い順</li>
    </ul>

    <div>カテゴリ</div>
    <ul>
      <li v-for="(category, index) in constCategories" :key="index">
          <nuxt-link :to="{ name: 'category-categoryId', params: { categoryId: category.id }}">
           <span class="category" v-if="category">{{ getCategoryLabel(category.id) }}</span>
          </nuxt-link>        
      </li>
    </ul>

    <div>タグ</div>
    <ul>
      <li v-for="(tag, index) in constTags" :key="index">
        <nuxt-link :to="{ name: 'tag-tagId', params: { tagId: tag.id }}">
          <span class="tag" v-if="tag">{{ getTagLabel(tag.id) }}</span>
        </nuxt-link>
      </li>
    </ul>

    <hr>

    <div
      class="item"
      v-for="(item, index) in items" :key="index">
          <nuxt-link :to="{ name: 'item-id', params: { id: item.fields.id }}">
          <img :src="item.fields.image[0].fields.file.url">
            <h1>{{ item.fields.name }}</h1>
         </nuxt-link>
           <b>{{ item.fields.price | priceFormat }}</b>
           <div>
          <nuxt-link :to="{ name: 'category-categoryId', params: { categoryId: item.fields.category }}">
          <span class="category" v-if="item.fields.category">{{ getCategoryLabel(item.fields.category) }}</span>
          </nuxt-link>
          <span v-for="(tag, index) in item.fields.tags" :key="index">
            <nuxt-link :to="{ name: 'tag-tagId', params: { tagId: tag }}">
              <span class="tag" v-if="tag">{{ getTagLabel(tag) }}</span>
            </nuxt-link>
          </span>

           </div>
    </div>
  </section>
</template>

<script>
import { CATEGORY } from '~/constants/category'
import { TAG } from '~/constants/tag'
import client from '~/plugins/contentful'

export default {
  asyncData() {
    return client.getEntries({
      'content_type' : 'item',
      // order: '-sys.createdAt'
    }).then(entries => {
      return { items: entries.items }
    })
    .catch(console.error)
  },
  filters: {
    priceFormat(value) {
      return '¥' + value.toLocaleString()
    }
  },
  computed: {
    constCategories() {
      return CATEGORY
    },
    constTags() {
      return TAG
    }
  },
  methods: {
    getTagLabel(tagId) {
      const tag = TAG.find(
        tag => tag.id === tagId
      )
      return tag.label
    },
    getCategoryLabel(categoryId) {
      const category = CATEGORY.find(
        category => category.id === categoryId
      )
      return category.label
    },
    sortItem(option) {
      let _items = this.items
      switch(option) {
        case 'HIGH':
          _items.sort(function(a, b){
            if(a.fields.price < b.fields.price) return 1;
            if(a.fields.price > b.fields.price) return -1;
            return 0;
          })
          break
        case 'LOW':
          _items.sort(function(a, b){
            if(a.fields.price < b.fields.price) return -1;
            if(a.fields.price > b.fields.price) return 1;
            return 0;
          })
          break
        case 'NEW':
          _items.sort(function(a, b){
            if(a.sys.createdAt < b.sys.createdAt) return 1;
            if(a.sys.createdAt > b.sys.createdAt) return -1;
            return 0;
          })
          break
        case 'ALL':
          _items.sort(function(a, b){
            if(a.sys.createdAt < b.sys.createdAt) return -1;
            if(a.sys.createdAt > b.sys.createdAt) return 1;
            return 0;
          })
          break
        case 'SOON':
          // @to do
          // 終了間近  campaignEndDateが1週間以内
          break
      }
      this.items = _items
    }
  }
};
</script>

<style>
select {
  width: 200px;
  height: 50px;
}

img {
  max-height: 200px;
  max-width: 100%;
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

/* .category {
  background-color: #ccc;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
}

.tag {
  background-color: #ddd;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
} */

b {
  font-size: 1.5em;
}
</style>
