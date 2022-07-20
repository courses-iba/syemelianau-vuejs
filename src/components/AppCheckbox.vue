<template>
  <button
    class="checkbox"
    :class="{checked: checked,  unchecked: !checked}"
    @click="$emit('change')"
  >
    <CheckboxMarked v-if="checked" :style="iconStyle" />
    <CheckboxBlankOutline v-else :style="iconStyle" />
    <span class="name" :class="{checkedName: checked, uncheckedName: !checked}">
      {{ name }}
    </span>
  </button>
</template>

<script>
import { CheckboxBlankOutline, CheckboxMarked } from 'mdue'

export default {
  components: {
    CheckboxBlankOutline,
    CheckboxMarked,
  },
  props: {
    name: String,
    checked: Boolean,
  },
  computed: {
    iconStyle() {
      return { color: this.checked ? '#1675e0' : '#8e8e93', fontSize: '24px' }
    },
  },
}
</script>

<style scoped>
.checkbox {
  background: none;
  outline: none;
  cursor: pointer;
  border-radius: 3em;
  display: flex;
  align-items: center;
  border: 1px solid;
  padding: .5vh 1vh;
  transition: 0.3s;
}

.name {
  padding-left: 1vh;
}

.checked {
  background-color: #f1f8ff;
  border-color: #1675e0;
}

.unchecked {
  border-color: #d9d9d9;
}

.checkedName {
  color: #1675e0;
}

.uncheckedName {
  color: #8e8e93;
}

.checkbox:hover {
  background-color: rgba(0, 0, 0, .1);
}

.checkbox:active {
  transition: none;
  background-color: #f1f8ff;
  border-color: #c8e1ff;
}
</style>
