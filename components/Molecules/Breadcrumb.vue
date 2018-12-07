<template>
  <div>
    <nuxt-link :to="{ name: 'index'}">ホーム</nuxt-link>
    ＞ {{ pageName }}
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    /**
     * pageName
     */
    pageName: {
      type: String,
      required: true
    }
  }
};
</script>
