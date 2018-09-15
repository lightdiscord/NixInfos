<template>
  <tr @click="detail">
    <td>{{ this.package.name }}</td>
    <td>{{ this.package.attribute }}</td>
    <td>{{ this.package.meta.description }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    package: Object,
    detail: Function,
  },
};
</script>

<style lang="stylus" scoped>
tr
  cursor pointer
</style>
