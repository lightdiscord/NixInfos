<template>
  <table class="ui inverted compact celled table">
    <thead>
      <tr>
        <th>Package name</th>
        <th>Attribute name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="entry in slice(pointer)">
        <package-head :key="entry.attribute" :package="entry" :detail="detail(entry)"></package-head>
        <package-metas :key="`${entry.attribute}-metas`" v-if="detailled.includes(entry.attribute)" :package="entry"></package-metas>
      </template>
    </tbody>
    <tfoot class="full-width">
      <tr>
        <th colspan="3">
          <button :disabled="beginning" @click="first" class="ui small button secondary">First</button>
          <button :disabled="beginning" @click="previous" class="ui small button secondary">Previous</button>
          <button :disabled="end" @click="next" class="ui small button secondary">Next</button>
          <button :disabled="end" @click="last" class="ui small button secondary">Last</button>
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { createNamespacedHelpers as namespace } from 'vuex';
import PackageHead from '@/components/packages/Head.vue';
import PackageMetas from '@/components/packages/Metas.vue';

const { mapGetters } = namespace('packages');

export default {
  data() {
    return {
      pointer: 0,
      detailled: [],
    };
  },
  computed: {
    ...mapGetters(['slice', 'size']),

    beginning() {
      return this.pointer === 0;
    },

    end() {
      return this.pointer === Math.floor(this.size.matches / 15);
    },
  },
  methods: {
    detail({ attribute }) {
      return () => (this.detailled = this.detailled.includes(attribute)
        ? this.detailled.filter((element) => element !== attribute)
        : [...this.detailled, attribute]);
    },

    first() {
      this.pointer = 0;
      this.refresh();
    },

    previous() {
      this.pointer -= 1;
      this.refresh();
    },

    next() {
      this.pointer += 1;
      this.refresh();
    },

    last() {
      this.pointer = Math.floor(this.size.matches / 15);
      this.refresh();
    },

    refresh() {
      this.detailled = [];
    },
  },
  components: {
    PackageHead,
    PackageMetas,
  },
};
</script>
