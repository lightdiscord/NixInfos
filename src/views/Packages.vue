<template>
  <div>
    <h1 class="title is-1">Packages</h1>

    <search @input="listen" placeholder="Search by name or description"></search>

    <h2 class="title is-2">Result</h2>
    <span class="subtitle is-4">Showing results {{ showing }}</span>

    <package-table ref="table"></package-table>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from 'vuex';

import Search from '@/components/Search.vue';
import PackageTable from '@/components/packages/Table.vue';

const { mapGetters, mapActions, mapMutations, mapState } = namespace('packages');

const search = (research) => ({ name, attribute, meta }) => {
  const check = (value) => value && value.includes(research);

  return check(name)
    || check(attribute)
    || check(meta.description)
    || check(meta.longDescription);
};

export default {
  data() {
    return {
      pointer: 0,
    };
  },

  computed: {
    ...mapState(['downloading']),
    ...mapGetters(['size']),

    showing() {
      const { pointer, size: { matches } } = this;
      return `${ pointer * 15 }-${ Math.min((pointer + 1) * 15, matches) } of ${ matches }`;
    },
  },

  methods: {
    ...mapActions(['download']),
    ...mapMutations(['storeFilter']),

    listen(value) {
      this.storeFilter(!!value ? search(value) : () => true);
    },
  },
  components: {
    Search,
    PackageTable,
  },
  mounted() {
    if (!this.downloading && this.size.total === 0) {
      this.download();
    }

    this.$watch(() => this.$refs.table.pointer, (pointer) => (this.pointer = pointer));
  },
};
</script>
