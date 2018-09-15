<template>
  <div id="app" class="ui inverted segment">
    <Menu></Menu>

    <router-view class="main ui container"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Menu from '@/components/Menu.vue';

export default Vue.extend({
  components: {
    Menu,
  },
});
</script>


<style lang="stylus">
body
  background-color #1b1c1d

#app
  margin-top 0
</style>
