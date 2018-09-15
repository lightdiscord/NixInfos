<template>
  <tr>
    <td colspan="3">
      <table class="ui definition table inverted">
        <tbody class="metas">
          <tr>
            <td>Install command</td>
            <td>{{ command }}</td>
          </tr>
          <tr>
            <td>Nix expression</td>
            <td>
              <a :href="expression.url" target="_blank">{{ expression.path }}</a>
            </td>
          </tr>
          <tr>
            <td>Platforms</td>
            <td>{{ platforms || 'Not specified' }}</td>
          </tr>
          <tr>
            <td>Homepage</td>
            <td>
              <a v-if="homepage" :href="homepage">{{ homepage }}</a>
              <template v-else>Not specified</template>
            </td>
          </tr>
          <tr>
            <td>License</td>
            <td>
              <a v-if="license" :href="license.url">{{ license.name }}</a>
              <template v-else>Not specified</template>
            </td>
          </tr>
          <tr>
            <td>Maintainers</td>
            <td>
              <template v-if="maintainers.length">
                <template v-for="(maintainer, i) in maintainers">
                  <a :href="maintainer.github" target="_blank" :key="i">{{ maintainer.name }}</a>
                  <span :key="`${i}-email`">
                    {{ maintainer.email | emailize }}<span v-if="maintainers.length - 1 > i">, </span>
                  </span>
                </template>
              </template>
              <template v-else>Not specified</template>
            </td>
          </tr>
          <tr>
            <td>Long description</td>
            <td>{{ description || 'Not specified' }}</td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  props: {
    package: Object,
  },

  computed: {
    ...mapState(['packagesCommit']),
    command() {
      return `$ nix-env -iA nixos.${this.package.attribute}`;
    },
    homepage() {
      return this.package.meta.homepage;
    },
    description() {
      return this.package.meta.longDescription;
    },
    platforms() {
      return (this.package.meta.platforms || [])
        .map((platform) => platform.kernel
          ? platform.kernel.name || platform.kernel.families.bsd.name
          : platform,
        )
        .join(', ');
    },
    expression() {
      const commit = this.packagesCommit;
      const [path, line] = this.package.meta.position.split(':');

      return {
        url: `https://github.com/NixOS/nixpkgs/blob/${commit}/${path}#L${line}`,
        path,
      };
    },
    license() {
      const { license = {} } = this.package.meta;
      const { url, spdxId: name } = license;

      return url && name && { url, name };
    },
    maintainers() {
      const { maintainers = [] } = this.package.meta;

      return maintainers.map(({ name, email, github }) => ({
        name,
        email,
        github: `https://github.com/${github}`,
      }));
    },
  },

  filters: {
    emailize: (email) => `<${email}>`,
  },
});
</script>

<style lang="stylus" scoped>
tbody.metas>tr>td:first-child
  width 20%
</style>
