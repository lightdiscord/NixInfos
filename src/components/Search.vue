<template>
  <div class="field">
    <label class="label">Search</label>
    <div class="control">
      <input @input="emit" ref="input" type="text" name="search" class="input" :placeholder="placeholder">
    </div>
  </div>
</template>

<script>
export default {
  props: ['placeholder'],
  methods: {
    emit() {
      this.$emit('input', this.$refs.input.value);
    },
  },
};
</script>
