<script lang="ts">
  type Padding = "none" | "light" | "normal" | "square" | "square-light";
  export let padding: Padding = "normal";
</script>

<div class="block padding-{padding}">
  {#if $$slots.title}
    <div class="title">
      <slot name="title" />
    </div>
  {/if}

  <div class="body">
    <slot />
  </div>
</div>

<style lang="less">
  .block {
    display: inline-block;
    border-radius: 0.3em;

    background-color: var(--color-bg-secondary);

    :global(.block-fullwidth) & {
      display: block;
    }

    &.padding-light {
      padding: 0.25em 0.4em;
    }
    &.padding-normal {
      padding: 0.5em 0.75em;
    }
    &.padding-square {
      padding: 0.5em;
    }
    &.padding-square-light {
      padding: 0.25em;
    }

    .title {
      text-align: center;
      font-size: 1.25em;

      border-bottom: 1px solid var(--color-bg-accent);
      margin-bottom: 0.5em;
    }
  }
</style>
