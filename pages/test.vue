<template>
  <div>
    <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zipcode: null
    }
  },
  asyncData({ store }) {
    store.dispatch('callApi',{
      url: 'api/search',
      method: 'get',
      params: {
        zipcode: '1850001'
      }
    })
  }
}
</script>
