<script lang="ts">
  import Block from "$theme/blocks/block.svelte";

  export let title: string;
</script>

<Block>
  <span slot="title">{title}</span>

  <div class="wrapper">
    <div class="c1">
      <slot name="first" />
    </div>

    <div class="c2">
      <slot name="second" />
    </div>
  </div>
</Block>

<style lang="less">
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: "c1 c2";
    gap: 1em;

    .c1 {
      grid-area: c1;
    }
    .c2 {
      grid-area: c2;
    }
  }
</style>
