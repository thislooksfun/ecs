<script lang="ts">
  export let name: string;
  export let avatarUrl: string | undefined = undefined;
</script>

<div class="sheet">
  <div class="info">
    {#if avatarUrl}
      <img class="avatar" src={avatarUrl} alt="{name}'s avatar" />
    {/if}
    <span class="name">{name}</span>
  </div>

  <div class="health block-fullwidth">
    <slot name="health" />
  </div>

  <div class="blocks">
    <slot />
  </div>
</div>

<style lang="less">
  .sheet {
    padding: 0 1em;
  }

  .health {
    position: relative;
    width: 100%;

    margin-bottom: 1em;
  }

  .blocks {
    display: flex;
    gap: 1em;

    flex-flow: row wrap;
    justify-content: center;
  }
</style>
