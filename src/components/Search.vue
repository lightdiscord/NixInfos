<template>
  <form class="ui form inverted">
    <div class="fields">
    <div class="five wide field">
      <label>Search</label>
      <input type="text" name="search" :placeholder="placeholder">
    </div>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['placeholder'],
});
</script>
