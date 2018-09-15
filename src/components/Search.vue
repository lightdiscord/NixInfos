<template>
  <form class="ui form inverted">
    <div class="fields">
      <div class="five wide field">
        <label>Search</label>
        <input @input="emit" ref="input" type="text" name="search" :placeholder="placeholder">
      </div>
    </div>
  </form>
</template>

<script>
import Vue from 'vue';

export default {
  props: ['placeholder'],
  methods: {
    emit() {
      this.$emit('input', this.$refs.input.value);
    },
  },
};
</script>
