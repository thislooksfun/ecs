<script lang="ts">
  export let submit: () => void;
</script>

<form on:submit|preventDefault={submit}>
  <slot />
</form>

<style lang="less">
  form {
    margin-top: 1em;
    margin-bottom: 1em;
  }
  form > :global(:not(:first-child)) {
    margin-top: 1.5em;
  }
</style>
