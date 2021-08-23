<script lang="ts">
  import LabeledValue from "$theme/labeledValue.svelte";
  import TitledTriplet from "$theme/blocks/titledTriplet.svelte";

  export let movementRate: number;
  export let carryingCapacity: number;
  export let initiative: number;
</script>

<TitledTriplet title="Stats">
  <LabeledValue
    slot="first"
    label="Movement Rate"
    value={movementRate}
    title="Movement rate: {movementRate} yards"
  />

  <LabeledValue
    slot="second"
    label="Carrying Capacity"
    value={carryingCapacity}
    title="Carrying capacity: {carryingCapacity}lbs"
  />

  <LabeledValue
    slot="third"
    label="Initiative"
    value={initiative}
    title="Initiative: {initiative}"
  />
</TitledTriplet>
