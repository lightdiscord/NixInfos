<template>
  <div>
    <h1>Packages</h1>

    <search placeholder="Search by name or description"></search>

    <h2>Result</h2>

    <table class="ui inverted compact celled table">
      <thead>
        <tr>
          <th>Package name</th>
          <th>Attribute name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="entry in entries">
          <tr :key="entry" @click="entry.details = !entry.details">
            <td>{{ entry.name }}</td>
            <td>{{ entry.attribute }}</td>
            <td>{{ entry.description }}</td>
          </tr>
          <tr v-if="entry.details" :key="entry">
            <td colspan="3">
              <table class="ui definition table inverted">
                <tbody>
                  <tr>
                    <td>Install command</td>
                    <td>$ command</td>
                  </tr>
                  <tr>
                    <td>Nix expression</td>
                    <td>pkgs/build-support/fetchurl/default.nix</td>
                  </tr>
                  <tr>
                    <td>Platforms</td>
                    <td>Not specified</td>
                  </tr>
                  <tr>
                    <td>Homepage</td>
                    <td>Not specified</td>
                  </tr>
                  <tr>
                    <td>License</td>
                    <td>Not specified</td>
                  </tr>
                  <tr>
                    <td>Maintainers</td>
                    <td>Not specified</td>
                  </tr>
                  <tr>
                    <td>Long description</td>
                    <td>Not specified</td>
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
            <div class="ui small button secondary">First</div>
            <div class="ui small button secondary">Previous</div>
            <div class="ui small button secondary">Next</div>
            <div class="ui small button secondary">Last</div>
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
        '3dpong-0.5 pong3d One or two player 3d sports game based on Pong from Atari',
        '4store-1.1.6 rdf4store SparQL query server (RDF storage)',
        '8086tiny-1.25 tiny8086 An open-source 8086 emulator',
        '915resolution-0.5.3 _915resolution A tool to modify Intel 800/900 video BIOS',
        '9pfs _9pfs FUSE-based client of the 9P network filesystem protocol',
      ].map((entry) => {
        const [name, attribute, ...description] = entry.split(' ');
        return { name, attribute, description: description.join(' '), details: false };
      }),
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
