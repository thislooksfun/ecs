<script lang="ts">
  import LabeledValue from "$theme/labeledValue.svelte";
  import TitledPair from "$theme/blocks/titledPair.svelte";

  export let physical: number;
  export let mystic: number;
</script>

<TitledPair title="Armor">
  <LabeledValue
    slot="first"
    label="Physical"
    value={physical}
    title="{physical} physical armor"
  />

  <LabeledValue
    slot="second"
    label="Mystic"
    value={mystic}
    title="{mystic} mystic armor"
  />
</TitledPair>
