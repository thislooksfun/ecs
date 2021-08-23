<script lang="ts">
  import TitledPair from "$theme/blocks/titledPair.svelte";
  import LabeledValue from "$theme/labeledValue.svelte";

  export let physical: number;
  export let mystic: number;
</script>

<TitledPair title="Shield">
  <LabeledValue
    slot="first"
    label="Physical"
    value={physical}
    title="{physical} physical shield"
  />

  <LabeledValue
    slot="second"
    label="Mystic"
    value={mystic}
    title="{mystic} mystic shield"
  />
</TitledPair>
