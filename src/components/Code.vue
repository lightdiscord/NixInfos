<template>
  <pre v-if="text" v-highlightjs><code :class="language">{{ text }}</code></pre>
  <span v-else>Not given</span>
</template>

<script>
export default {
  props: ['text', 'language'],
};
</script>
