<template>
  <div class="card" :class="this.color" @click="this.toggleChecked">
    <div v-if="this.readonly">
      <div class="header">
        <span class="title">{{ this.content.title }}</span>
      </div>
      <AppDivider />
      <div class="body">{{ this.content.description }}</div>
    </div>
    <div v-else-if="this.isEdit">
      <div class="header">
        <input
            class="input"
            :value="this.newContent.title"
            @change="this.changeTitle"
        />
        <div class="buttons">
          <button class="button" @click="this.editCard">
            <Check :style="this.iconStyle" />
          </button>
          <button class="button" @click="this.toggleEdit">
            <Close :style="this.iconStyle" />
          </button>
        </div>
      </div>
      <AppDivider />
      <div class="body">
      <textarea
          class="input"
          :style="{ height: this.height }"
          :value="this.newContent.description"
          @change="this.changeContent"
      />
      </div>
    </div>
    <div v-else>
      <div class="header">
        <span class="title">{{ this.content.title }}</span>
        <div class="buttons">
          <button class="button" @click="this.toggleEdit">
            <Pencil :style="this.iconStyle" />
          </button>
        </div>
      </div>
      <AppDivider />
      <div class="body">{{ this.content.description }}</div>
    </div>
  </div>
</template>

<script>
import { Pencil, Close, Check } from 'mdue';
import AppDivider from '@/components/AppDivider';

export default {
  components: {
    Pencil,
    Close,
    Check,
    AppDivider
  },
  props: {
    readonly: Boolean,
    content: {
      title: String,
      description: String
    }
  },
  data() {
    return {
      checked: null,
      isEdit: false,
      newContent: this.content,
      iconStyle: { color: '#586069', fontSize: '24px' }
    };
  },
  computed: {
    color() {
      return `card${this.checked}`;
    },
    height() {
      const min = 2;
      const max = this.newContent.description.length / 20;
      const res = max < min ? min : max;
      return `${res}em`;
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
      const randomColor = Math.floor(Math.random() * 5) + 1;
      this.checked = this.isEdit || this.checked ? null : randomColor;
    },
    toggleEdit(e) {
      e?.stopPropagation();
      this.checked = null;
      this.isEdit = !this.isEdit;
      this.newContent = this.content;
    },
    changeTitle(event) {
      this.newContent = { ...this.newContent, title: event.target.value };
    },
    changeContent(event) {
      this.newContent = { ...this.newContent, description: event.target.value };
    },
    editCard(e) {
      e?.stopPropagation();
      this.$emit('edit', this.newContent);
      this.toggleEdit();
    }
  }
};
</script>

<style scoped>
.card {
  padding: 1vh;
  margin: 1vh;
  display: flex;
  flex-direction: column;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  width: 16vw;
  min-width: 16em;
  max-width: 26em;
  transition: 0.3s;
}

.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.card:active {
  border-color: #c0c2c6;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}

.header, .body {
  padding: 0 5%;
}

.body, .title {
  overflow: hidden;
  text-overflow: ellipsis;
}

.title {
  white-space: nowrap;
}

.card1 {
  background-color: #f1f8ff;
  border-color: #c8e1ff;
}

.card2 {
  background-color: #f0fff4;
  border-color: #bef5cb;
}

.card3 {
  background-color: #fffdef;
  border-color: #fff5b1;
}

.card4 {
  background-color: #fff8f2;
  border-color: #ffd1ac;
}

.card5 {
  background-color: #f5f0ff;
  border-color: #d1bcf9;
}

.buttons {
  display: flex;
}

.button {
  background: none;
  border: none;
  cursor: pointer;
  height: 3em;
  width: 3em;
  border-radius: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: 0.3s;
  margin-left: 3px;
}

.button:hover {
  background-color: rgba(0, 0, 0, .1);
}

.button:active {
  transition: none;
  background-color: #f1f8ff;
  border: 1px solid #c8e1ff;
}

.button:focus {
  border: 1px solid #c8e1ff;
}

.input {
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  outline: none;
  resize: none;
}
</style>
