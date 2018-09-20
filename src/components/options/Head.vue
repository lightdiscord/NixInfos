<template>
  <tr @click="detail">
    <td>{{ option.name }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    option: Object,
    detail: Function,
  },
};
</script>

<style lang="stylus" scoped>
tr
  cursor pointer
</style>
