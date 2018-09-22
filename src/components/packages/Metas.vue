<template>
  <tr>
    <td colspan="3">
      <table class="table is-hoverable is-striped is-fullwidth">
        <tbody class="metas">
          <tr>
            <td>Install command</td>
            <td>
              <Code :text="command" language="console" />
            </td>
          </tr>
          <tr>
            <td>Nix expression</td>
            <td>
              <a :href="expression.url" target="_blank">{{ expression.path }}</a>
            </td>
          </tr>
          <tr v-if="platforms.length">
            <td>Platforms</td>
            <td>{{ platforms }}</td>
          </tr>
          <tr v-if="package.meta.homepage">
            <td>Homepage</td>
            <td>
              <a :href="package.meta.homepage">{{ package.meta.homepage }}</a>
            </td>
          </tr>
          <tr v-if="license">
            <td>License</td>
            <td>
              <a :href="license.url">{{ license.name }}</a>
            </td>
          </tr>
          <tr v-if="maintainers.length">
            <td>Maintainers</td>
            <td>
              <template v-for="(maintainer, i) in maintainers">
                <a :href="maintainer.github" target="_blank" :key="i">{{ maintainer.name }}</a>
                <span :key="`${i}-email`">
                  {{ maintainer.email | emailize }}<span v-if="maintainers.length - 1 > i">, </span>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="package.meta.longDescription">
            <td>Long description</td>
            <td>{{ package.meta.longDescription }}</td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</template>

<script>
import { createNamespacedHelpers as namespace } from 'vuex';

import Code from '@/components/Code.vue';

const { mapState } = namespace('packages');

export default {
  props: {
    package: Object,
  },

  computed: {
    ...mapState(['commit']),

    command() {
      return `$ nix-env -iA nixos.${this.package.attribute}`;
    },

    platforms() {
      const platforms = (this.package.meta.platforms || [])
        .map((platform) => platform.kernel
          ? platform.kernel.name || platform.kernel.families.bsd.name
          : platform,
        );

      return [...new Set(platforms)].join(', ');
    },

    expression() {
      const commit = this.commit;
      const [path, line] = this.package.meta.position.split(':');

      return {
        url: `https://github.com/NixOS/nixpkgs/blob/${commit}/${path}#L${line}`,
        path,
      };
    },

    license() {
      const { url, spdxId: name } = this.package.meta.license || {};

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

  components: {
    Code,
  },
};
</script>

<style lang="stylus" scoped>
tbody.metas>tr>td:first-child
  width 20%
</style>
