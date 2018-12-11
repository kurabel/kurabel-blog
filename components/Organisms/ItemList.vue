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
import labelManager from '~/plugins/labelManager'

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
  mixins: [labelManager],
}
</script>
