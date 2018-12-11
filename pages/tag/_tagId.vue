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
import labelManager from '~/plugins/labelManager'
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
  mixins: [labelManager],
};
</script>
