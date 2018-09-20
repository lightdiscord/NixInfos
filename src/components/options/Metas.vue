<template>
  <tr>
    <td colspan="3">
      <table class="table is-hoverable is-striped is-fullwidth">
        <tbody class="metas">
          <tr>
            <td>Description</td>
            <td>{{ option.description }}</td>
          </tr>
          <tr v-if="option.default">
            <td>Default value</td>
            <td>
              <Code :text="option.default" language="json" />
            </td>
          </tr>
          <tr v-if="option.example">
            <td>Example value</td>
            <td>
              <Code :text="option.example" language="json" />
            </td>
          </tr>
          <tr>
            <td>Declared in</td>
            <td>
              <template v-for="declaration in option.declarations">
                <Declaration :key="declaration" :declaration="declaration" />&nbsp;
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</template>

<script>
import Code from '@/components/Code.vue';
import Declaration from './Declaration.vue';

export default {
  props: {
    option: Object,
  },

  filters: {
    stringify: (content) => content ? JSON.stringify(content, null, '\t') : 'Not given',
  },

  components: {
    Code,
    Declaration,
  },
};
</script>

<style lang="stylus" scoped>
tbody.metas>tr>td:first-child
  width 20%
</style>
