<template>
  <div :class="styles.element">
    <label>{{ label }}: </label>
    <input
        :class="[styles.input, {[styles.error]: meta.touched && errorMessage}]"
        :name="name"
        :type="type"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleChange"
        @blur="handleBlur"
    />
    <span v-show="meta.touched" :class="styles.error">{{ errorMessage }}</span>
  </div>
</template>

<script>
import { toRef } from 'vue';
import { useField } from 'vee-validate';

import styles from '@/styles/AppInput.module.css';

export default {
  props: {
    name: { type: String, required: true },
    type: { type: String, default: 'text' },
    value: String,
    placeholder: String
  },
  setup(props) {
    const name = toRef(props, 'name');
    const {
      handleChange,
      handleBlur,
      value: inputValue,
      errorMessage,
      meta
    } = useField(name, undefined, { initialValue: props.value });

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta
    };
  },
  data() {
    return {
      styles,
      label: this.name[0].toUpperCase() + this.name.slice(1).toLowerCase()
    };
  }
};
</script>

<style scoped>
</style>
