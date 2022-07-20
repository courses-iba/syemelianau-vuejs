<template>
  <div v-if="!readonly && isEdit" :class="styles.body">
    <textarea
      :class="styles.input"
      :style="{height: height}"
      :value="newDescription"
      @input="handleChange"
    />
  </div>
  <div v-else :class="styles.body">{{ description }}</div>
</template>

<script>
import styles from '@/components/AppCard/AppCard.module.css'
import { calcHeight } from '@/utils'

export default {
  props: {
    description: String,
    newDescription: String,
    readonly: Boolean,
    isEdit: Boolean,
  },
  data() {
    return {
      styles,
    }
  },
  computed: {
    height() {
      return calcHeight(this.newDescription.length)
    },
  },
  methods: {
    handleChange(event) {
      this.$emit('edit', event.target.value)
    },
  },
}
</script>

<style scoped></style>
