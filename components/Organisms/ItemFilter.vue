<template>
  <div>
    <h3>並び替え</h3>
    <ul>
      <li @click="sortItem('ALL')">すべてを表示</li>
      <li @click="sortItem('NEW')">新着商品</li>
      <li @click="sortItem('SOON')">まもなく終了（to do）</li>
      <li @click="sortItem('LOW')">価格が安い順</li>
      <li @click="sortItem('HIGH')">価格が高い順</li>
    </ul>

    <h4>カテゴリ</h4>
    <ul>
      <li v-for="(category, index) in constCategories" :key="index">
          <nuxt-link :to="{ name: 'category-categoryId', params: { categoryId: category.id }}">
           <span class="category" v-if="category">{{ getCategoryLabel(category.id) }}</span>
          </nuxt-link>        
      </li>
    </ul>

    <h4>タグ</h4>
    <ul>
      <li v-for="(tag, index) in constTags" :key="index">
        <nuxt-link :to="{ name: 'tag-tagId', params: { tagId: tag.id }}">
          <span class="tag" v-if="tag">{{ getTagLabel(tag.id) }}</span>
        </nuxt-link>
      </li>
    </ul>

  </div>
</template>

<script>
import { CATEGORY } from '~/constants/category'
import { TAG } from '~/constants/tag'

export default {
  name: 'ItemFilter',
  props: {
    /**
     * items
     */
    items: {
        type: Array,
        required: true,
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
}
</script>
