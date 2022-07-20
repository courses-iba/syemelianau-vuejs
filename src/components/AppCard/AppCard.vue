<template>
  <div :class="[styles.card, styles[color]]" @click="handleCheck" @dblclick="handleOpen">
    <CardHeader
      :title="content.title"
      :newTitle="newContent.title"
      :readonly="pageStore.readonly"
      :isEdit="isEdit"
      @edit="editTitle"
    >
      <div v-if="isEdit" :class="styles.buttons">
        <button :class="iButton" @click="handleConfirm">
          <Check :style="pageStore.iDefault" />
        </button>
        <button :class="iButton" @click="handleEdit">
          <Close :style="pageStore.iDefault" />
        </button>
      </div>
      <div v-else :class="styles.buttons">
        <button :class="iButton" @click="handleEdit">
          <Pencil :style="pageStore.iDefault" />
        </button>
      </div>
    </CardHeader>
    <AppDivider />
    <CardBody
      :description="content.description"
      :newDescription="newContent.description"
      :readonly="pageStore.readonly"
      :isEdit="isEdit"
      @edit="editDescription"
    />
  </div>
</template>

<script>
import { Pencil, Close, Check } from 'mdue'

import AppDivider from '@/components/AppDivider'
import CardHeader from '@/components/AppCard/CardHeader'
import CardBody from '@/components/AppCard/CardBody'
import { randomState } from '@/utils'
import styles from '@/components/AppCard/AppCard.module.css'
import { iButton } from '@/styles/AppButton.module.css'
import { usePageStore } from '@/store/page'
import { useCardStore } from '@/store/card'

export default {
  components: {
    Pencil,
    Close,
    Check,
    AppDivider,
    CardHeader,
    CardBody,
  },
  props: {
    id: String,
    content: { title: String, description: String },
    checked: [Number, null],
  },
  setup() {
    const cardStore = useCardStore()
    const pageStore = usePageStore()

    return {
      cardStore,
      pageStore,
    }
  },
  data() {
    return {
      styles,
      iButton,
      isEdit: !!this.checked,
      newContent: this.content,
    }
  },
  computed: {
    color() {
      return `card${this.checked}`
    },
  },
  methods: {
    handleCheck() {
      if (!(this.isEdit && this.checked)) {
        this.cardStore.handleChange({
          id: this.id,
          content: this.content,
          checked: this.isEdit || this.checked ? null : randomState(),
        })
      }
    },
    handleOpen() {
      !this.isEdit && this.$router.push({
        name: 'Card',
        params: { id: this.id },
      })
    },
    handleButtonPress(e) {
      e?.stopPropagation()
      this.isEdit = !this.isEdit
    },
    handleConfirm(e) {
      this.handleButtonPress(e)
      this.cardStore.handleChange({ id: this.id, content: this.newContent, checked: null })
    },
    handleEdit(e) {
      this.handleButtonPress(e)
      this.cardStore.handleChange({ id: this.id, content: this.content, checked: null })
      this.newContent = this.content
    },
    editTitle(title) {
      this.newContent = { ...this.newContent, title }
    },
    editDescription(description) {
      this.newContent = { ...this.newContent, description }
    },
  },
  mounted() {
    this.pageStore.$subscribe(() => {
      if (this.pageStore.readonly) {
        this.isEdit = false
      }
    })
  },
}
</script>

<style scoped>
</style>
