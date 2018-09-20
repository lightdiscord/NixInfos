<template>
  <table class="table is-hoverable is-striped is-fullwidth">
    <thead>
      <tr>
        <th>Package name</th>
        <th>Attribute name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="entry in slice(pointer)">
        <package-head :key="entry.attribute" :package="entry" :detail="detail(entry)" :class="{ 'is-selected': showMetas(entry) }"></package-head>
        <package-metas :key="`${entry.attribute}-metas`" v-if="showMetas(entry)" :package="entry"></package-metas>
      </template>
    </tbody>
    <tfoot class="full-width">
      <tr>
        <th colspan="3">
          <div class="buttons has-addons">
            <button :disabled="beginning" @click="first" class="button">First</button>
            <button :disabled="beginning" @click="previous" class="button">Previous</button>
            <button :disabled="end" @click="next" class="button">Next</button>
            <button :disabled="end" @click="last" class="button">Last</button>
          </div>
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

    showMetas({ attribute }) {
      return this.detailled.includes(attribute);
    },
  },
  components: {
    PackageHead,
    PackageMetas,
  },
};
</script>
