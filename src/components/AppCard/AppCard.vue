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
        <button :class="iButton" @click="editCard">
          <Check :style="iconStyle" />
        </button>
        <button :class="iButton" @click="toggleEdit">
          <Close :style="iconStyle" />
        </button>
      </div>
      <div v-else :class="styles.buttons">
        <button :class="iButton" @click="toggleEdit">
          <Pencil :style="iconStyle" />
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
import { Pencil, Close, Check } from 'mdue';
import AppDivider from '@/components/AppDivider';
import CardHeader from '@/components/AppCard/CardHeader';
import CardBody from '@/components/AppCard/CardBody';
import styles from './AppCard.module.css';
import { iButton } from '../../styles/AppButton.module.css';

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
    checked: [Number, null],
    readonly: Boolean,
    content: {
      title: String,
      description: String
    }
  },
  data() {
    return {
      styles,
      iButton,
      isEdit: false,
      newContent: this.content,
      iconStyle: { color: '#586069', fontSize: '24px' }
    };
  },
  computed: {
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
    toggleChecked() {
      const randomState = Math.floor(Math.random() * 5) + 1;
      this.$emit('check', this.isEdit || this.checked ? null : randomState);
    },
    toggleEdit(e) {
      e?.stopPropagation();
      this.checked && this.$emit('check', null);
      this.isEdit = !this.isEdit;
      this.newContent = this.content;
    },
    editCard(e) {
      e?.stopPropagation();
      this.$emit('edit', this.newContent);
      this.toggleEdit();
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
