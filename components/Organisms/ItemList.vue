<template>
	<div>
		<div class="item" v-for="(item, index) in items" :key="index">
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
	</div>
</template>

<script>
import { CATEGORY } from '~/constants/category'
import { TAG } from '~/constants/tag'

export default {
	name: 'ItemList',
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
	},
  filters: {
    priceFormat(value) {
      return '¥' + value.toLocaleString()
    }
  },
}
</script>
