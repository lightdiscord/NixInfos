<template>
  <a :href="url" target="_blank">{{ declaration }}</a>
</template>

<script>
export default {
  props: ['declaration'],
  computed: {
    url() {
      return `https://github.com/NixOS/nixpkgs/blob/master/${this.declaration}`;
    },
  },
};
</script>
