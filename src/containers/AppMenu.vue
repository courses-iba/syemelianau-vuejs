<template>
  <nav class="menu">
    <AppCheckbox name="Readonly" :checked="readonly" @change="handleReadonly" />
    <button :class="iButton" @click="handleAdd">
      <Plus :style="iAction" />
    </button>
    <button :class="iButton" @click="handleDelete">
      <Delete :style="iAction" />
    </button>
  </nav>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { Delete, Plus } from 'mdue';

import AppCheckbox from '@/components/AppCheckbox';
import * as types from '@/store/mutation.types';
import { iButton } from '@/styles/AppButton.module.css';

export default {
  components: {
    AppCheckbox,
    Delete,
    Plus
  },
  data() {
    return {
      types,
      iButton
    };
  },
  computed: {
    ...mapState(['readonly']),
    ...mapGetters(['iAction'])
  },
  methods: {
    ...mapActions({
      handleAdd: 'createCard',
      handleDelete: 'deleteCards',
      handleReadonly: 'toggleReadonly'
    })
  }
};
</script>

<style scoped>
.menu {
  display: flex;
  padding: 1vh 2vw;
  border-bottom: 1px solid #e1e4e8;

  -webkit-box-shadow: 0 4px 2px -2px rgba(41, 41, 41, .25);
  -moz-box-shadow: 0 4px 2px -2px rgba(41, 41, 41, .25);
  box-shadow: 0 4px 2px -2px rgba(41, 41, 41, .25);
}
</style>
