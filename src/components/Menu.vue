<template>
  <div class="ui inverted secondary pointing menu">
    <div class="ui container">
      <router-link class="item" to="/" exact-active-class="active">Home</router-link>
      <router-link class="item" to="/packages" exact-active-class="active">Packages</router-link>
      <router-link class="item" to="/options" exact-active-class="active">Options</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Menu',
});
</script>
