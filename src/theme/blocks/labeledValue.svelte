<script lang="ts">
  export let label: any;
  export let value: any;
  export let title: string | undefined = undefined;
</script>

<div class="lv" {title}>
  <div class="label">{label}</div>
  <div class="value">{value}</div>
</div>

<style lang="less">
  .lv {
    text-align: center;

    // .label {
    // }

    .value {
      font-size: 2em;
      font-weight: bold;
    }
  }
</style>
