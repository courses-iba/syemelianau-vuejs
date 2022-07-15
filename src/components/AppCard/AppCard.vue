<template>
  <div :class="[styles.card, styles[color]]" @click="toggleChecked">
    <CardHeader
        :title="content.title"
        :newTitle="newContent.title"
        :readonly="readonly"
        :isEdit="isEdit"
        @edit="editTitle"
    >
      <div v-if="isEdit" :class="styles.buttons">
        <button :class="iButton" @click="toggleConfirm">
          <Check :style="iDefault" />
        </button>
        <button :class="iButton" @click="toggleEdit">
          <Close :style="iDefault" />
        </button>
      </div>
      <div v-else :class="styles.buttons">
        <button :class="iButton" @click="toggleEdit">
          <Pencil :style="iDefault" />
        </button>
      </div>
    </CardHeader>
    <AppDivider />
    <CardBody
        :description="content.description"
        :newDescription="newContent.description"
        :readonly="readonly"
        :isEdit="isEdit"
        @edit="editDescription"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { Pencil, Close, Check } from 'mdue';

import AppDivider from '@/components/AppDivider';
import CardHeader from '@/components/AppCard/CardHeader';
import CardBody from '@/components/AppCard/CardBody';
import { randomState } from '@/utils';
import styles from '@/components/AppCard/AppCard.module.css';
import { iButton } from '@/styles/AppButton.module.css';

export default {
  components: {
    Pencil,
    Close,
    Check,
    AppDivider,
    CardHeader,
    CardBody
  },
  props: {
    id: String,
    content: { title: String, description: String },
    checked: [Number, null]
  },
  data() {
    return {
      styles,
      iButton,
      isEdit: !!this.checked,
      newContent: this.content
    };
  },
  computed: {
    ...mapState(['readonly']),
    ...mapGetters(['iDefault']),
    color() {
      return `card${this.checked}`;
    }
  },
  watch: {
    readonly(value) {
      if (value) {
        this.isEdit = false;
      }
    }
  },
  methods: {
    ...mapActions({
      handleEdit: 'updateCard'
    }),
    toggleChecked() {
      if (!(this.isEdit && this.checked)) {
        this.handleEdit({
          id: this.id,
          content: this.content,
          checked: this.isEdit || this.checked ? null : randomState()
        });
      }
    },
    handleButtonPress(e) {
      e?.stopPropagation();
      this.isEdit = !this.isEdit;
    },
    toggleConfirm(e) {
      this.handleButtonPress(e);
      this.handleEdit({ id: this.id, content: this.newContent, checked: null });
    },
    toggleEdit(e) {
      this.handleButtonPress(e);
      this.handleEdit({ id: this.id, content: this.content, checked: null });
      this.newContent = this.content;
    },
    editTitle(title) {
      this.newContent = { ...this.newContent, title };
    },
    editDescription(description) {
      this.newContent = { ...this.newContent, description };
    }
  }
};
</script>

<style scoped></style>
