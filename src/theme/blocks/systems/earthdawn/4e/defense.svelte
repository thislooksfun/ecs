<script lang="ts">
  import LabeledValue from "$theme/labeledValue.svelte";
  import TitledTriplet from "$theme/blocks/titledTriplet.svelte";

  export let physical: number;
  export let mystic: number;
  export let social: number;
</script>

<TitledTriplet title="Defense">
  <LabeledValue
    slot="first"
    label="Physical"
    value={physical}
    title="{physical} physical defense"
  />

  <LabeledValue
    slot="second"
    label="Mystic"
    value={mystic}
    title="{mystic} mystic defense"
  />

  <LabeledValue
    slot="third"
    label="Social"
    value={social}
    title="{social} social defense"
  />
</TitledTriplet>
