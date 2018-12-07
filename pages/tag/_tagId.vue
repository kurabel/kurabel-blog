<template>
  <section class="index">
    <div>
      <nuxt-link :to="{ name: 'index'}">ホーム</nuxt-link>
      ＞ {{ getTagLabel(tagId) }}
    </div>
    <h2 class="tag">{{ getTagLabel(tagId) }}</h2>
    <ItemList :items="items"/>
  </section>
</template>

<script>
import { CATEGORY } from "~/constants/category";
import { TAG } from "~/constants/tag";
import client from "~/plugins/contentful";
import ItemList from "~/components/Organisms/ItemList";

export default {
  asyncData({ params }) {
    return client
      .getEntries({
        content_type: "item",
        "fields.tags[in]": params.tagId,
        order: "-sys.createdAt"
      })
      .then(entries => {
        return {
          items: entries.items,
          tagId: params.tagId
        };
      })
      .catch(console.error);
  },
  components: {
    ItemList
  },
  filters: {
    priceFormat: function(value) {
      return "¥" + value.toLocaleString();
    }
  },
  methods: {
    getTagLabel(tagId) {
      const tag = TAG.find(tag => tag.id === tagId);
      return tag.label;
    },
    getCategoryLabel(categoryId) {
      const category = CATEGORY.find(category => category.id === categoryId);
      return category.label;
    }
  }
};
</script>
