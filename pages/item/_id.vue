<template>
  <section>
    <div class="item">
      <img :src="item.fields.image[0].fields.file.url">
      <h1>{{ item.fields.name }}</h1>
      <div>
        <div>
          参考価格：
          <span class="referencePrice">{{ item.fields.referencePrice | priceFormat }}</span>
        </div>
        <div>
          WEB限定価格
          <span class="price">{{ item.fields.price | priceFormat }}</span>
        </div>
        <div>
          OFF：
          <span class="price">{{discountPrice | priceFormat }}({{discountRate}}%)</span>
        </div>
        <div>
          <nuxt-link
            class="category"
            :to="{ name: 'category-categoryId', params: { categoryId: item.fields.category }}"
          >
            <span v-if="item.fields.category">{{ getCategoryLabel(item.fields.category) }}</span>
          </nuxt-link>
          <span v-for="(tag, index) in item.fields.tags" :key="index">
            <nuxt-link class="tag" :to="{ name: 'tag-tagId', params: { tagId: tag }}">
              <span v-if="tag">{{ getTagLabel(tag) }}</span>
            </nuxt-link>
          </span>
        </div>
      </div>
      <br>
      <div>{{ item.fields.description }}</div>
      <a :href="item.fields.officialUrl" class="officialUrl">公式サイトを見る</a>
    </div>

    <h2>関連する商品</h2>
    <ItemList :items="relatedItems"/>
  </section>
</template>

<script>
import labelManager from '~/plugins/labelManager'
import client from "~/plugins/contentful";
import ItemList from "~/components/Organisms/ItemList";

export default {
  data() {
    return {
      relatedItems: []
    };
  },
  head() {
    return {
      title: this.itemName + " | kurabel",
      meta: [
        { name: "keywords", content: this.itemName },
        {
          hid: "description",
          name: "description",
          content: "This is " + this.itemName
        }
      ]
    };
  },
  components: {
    ItemList
  },
  mixins: [labelManager],
  asyncData({ params }) {
    return client
      .getEntries({
        content_type: "item",
        "fields.id": params.id
      })
      .then(entries => {
        return {
          itemId: entries.items[0].fields.id,
          item: entries.items[0],
          itemName: entries.items[0].fields.name,
          itemCategory: entries.items[0].fields.category,
          discountPrice:
            entries.items[0].fields.referencePrice -
            entries.items[0].fields.price,
          discountRate: Math.floor(
            100 -
              (entries.items[0].fields.price /
                entries.items[0].fields.referencePrice) *
                100
          )
        };
      })
      .catch(console.error);
  },
  created() {
    // this.getRelatedItems();
  },
  methods: {
    /**
     * 関連商品の取得
     */
    getRelatedItems() {
      return client
        .getEntries({
          content_type: "item",
          "fields.category[match]": this.itemCategory,
          order: "-sys.createdAt"
        })
        .then(entries => {
          this.relatedItems = entries.items.filter(
            item => item.fields.id != this.itemId
          );
        })
        .catch(console.error);
    }
  }
};
</script>

<style>
.officialUrl {
  display: block;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  color: #fff !important;
  background-color: orange;
  text-decoration: none;
  padding: 15px;
  margin-top: 30px;
}

.referencePrice {
  text-decoration: line-through;
}

.price {
  color: #b12704;
  font-size: 1.5em;
}
</style>
