<script lang="ts">
  import Theme from "$theme/theme.svelte";
  import Nav from "$components/nav.svelte";

  let showNav = true;
</script>

<Theme />

<div class="layout" class:show-nav={showNav}>
  <div class="nav-container">
    <Nav />
  </div>

  <div class="body-container">
    <slot />
  </div>
</div>

<style lang="less">
  .layout {
    position: relative;
    height: 100%;
  }

  // Narrow (mobile) layout
  .nav-container {
    display: none;
    position: relative;
    height: 100%;
  }

  .show-nav {
    .nav-container {
      display: block;
      background-color: red;
    }
  }

  // Wide (desktop) layout
  @media (min-width: 500px) {
    .layout {
      display: grid;

      .nav-container {
        display: block;
        background-color: orange;
      }

      .body-container {
        position: inherit;
        // background-color: aquamarine;
      }
    }
  }
</style>
