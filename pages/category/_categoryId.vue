<template>
  <section class="index">
    <div>
      <nuxt-link :to="{ name: 'index'}">ホーム</nuxt-link>
      ＞ {{ getCategoryLabel(categoryId) }}
    </div>
    <h2 class="category">{{ getCategoryLabel(categoryId) }}</h2>
    <ItemList :items="items"/>
  </section>
</template>

<script>
import labelManager from '~/plugins/labelManager'
import client from "~/plugins/contentful";
import ItemList from "~/components/Organisms/ItemList";

export default {
  asyncData({ params }) {
    return client
      .getEntries({
        content_type: "item",
        "fields.category[match]": params.categoryId,
        order: "-sys.createdAt"
      })
      .then(entries => {
        return {
          items: entries.items,
          categoryId: params.categoryId
        };
      })
      .catch(console.error);
  },
  components: {
    ItemList
  },
  mixins: [labelManager],
  methods: {
  }
};
</script>
