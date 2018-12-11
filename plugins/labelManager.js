import { CATEGORY } from '~/constants/category'
import { TAG } from '~/constants/tag'

export default {
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
		}
  }
}
