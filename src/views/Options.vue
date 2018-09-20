<template>
  <div>
    <h1 class="title is-1">Options</h1>

    <search placeholder="Search by name or description"></search>

    <h2 class="title is-2">Result</h2>

    <table class="table is-hoverable is-striped is-fullwidth">
      <thead>
        <tr>
          <th>Option name</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="entry in entries">
          <tr :key="entry" @click="entry.details = !entry.details">
            <td>{{ entry.name }}</td>
          </tr>
          <tr v-if="entry.details" :key="entry">
            <td colspan="1">
              <table class="table is-hoverable is-striped-is-fullwidth">
                <tbody>
                  <tr>
                    <td>Description</td>
                    <td>The byte offset of the magic number used for recognition.</td>
                  </tr>
                  <tr>
                    <td>Default value</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Example value</td>
                    <td>Not given</td>
                  </tr>
                  <tr>
                    <td>Declared in</td>
                    <td>nixos/modules/system/boot/binfmt.nix</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot class="full-width">
        <tr>
          <th colspan="3">
            <div class="buttons has-addons">
              <div class="button">First</div>
              <div class="button">Previous</div>
              <div class="button">Next</div>
              <div class="button">Last</div>
            </div>
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Search from '@/components/Search.vue';

export default Vue.extend({
  data() {
    return {
      entries: [
        'boot.binfmtMiscRegistrations',
        'boot.binfmtMiscRegistrations.<name>.fixBinary',
        'boot.binfmtMiscRegistrations.<name>.interpreter',
        'boot.binfmtMiscRegistrations.<name>.magicOrExtension',
        'boot.binfmtMiscRegistrations.<name>.mask',
      ].map((name) => ({ name, details: false })),
    };
  },
  components: {
    Search,
  },
});
</script>

<style lang="stylus" scoped>
tr
  cursor pointer
</style>
