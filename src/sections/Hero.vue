<template>
  <section id="app" class="hero is-dark is-medium">
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <span class="navbar-burger burger" data-target="menu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <Menu id="menu" class="navbar-menu"></Menu>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import Menu from '@/components/Menu.vue';

export default {
  components: {
    Menu,
  },
};
</script>


<style lang="stylus" scoped>
.navbar-burger
  position absolute
</style>
