<template>
  <table class="table is-hoverable is-striped is-fullwidth">
    <thead>
      <tr>
        <th>Option name</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="entry in slice(pointer)">
        <option-head :key="entry.name" :option="entry" :detail="detail(entry)" :class="{ 'is-selected': showMetas(entry) }"></option-head>
        <option-metas :key="`${entry.name}-metas`" v-if="showMetas(entry)" :option="entry"></option-metas>
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
import OptionHead from './Head.vue';
import OptionMetas from './Metas.vue';

const { mapGetters } = namespace('options');

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

    current() {
      return this.slice(this.pointer);
    },
  },
  methods: {
    detail({ name }) {
      return () => (this.detailled = this.detailled.includes(name)
        ? this.detailled.filter((element) => element !== name)
        : [...this.detailled, name]);
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

    showMetas({ name }) {
      return this.detailled.includes(name);
    },
  },
  components: {
    OptionHead,
    OptionMetas,
  },
};
</script>
