<template>
  <section class="index">
    <ItemFilter :items="items"/>
    <ItemList :items="items"/>
  </section>
</template>

<script>
import ItemFilter from '~/components/Organisms/ItemFilter'
import ItemList from '~/components/Organisms/ItemList'
import client from '~/plugins/contentful'

export default {
  components: {
    ItemFilter, ItemList
  },
  asyncData( env ) {
    return client.getEntries({
      'content_type' : env.CONTENT_TYPE,
      order: '-sys.createdAt'
    }).then(entries => {
      return { items: entries.items }
    })
    .catch(console.error)
  },
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
