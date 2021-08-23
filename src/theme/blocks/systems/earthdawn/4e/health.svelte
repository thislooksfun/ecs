<script lang="ts">
  import Block from "$theme/blocks/block.svelte";
  import Button from "$theme/button.svelte";
  import HealthBar from "./healthbar.svelte";

  // TODO: Redesign interaction
  // This currently has two buttons, one that adds one point of damage and one
  // that removes a point. The button that adds damage should instead bring up a
  // modal (or otherwise provide a way to take input) and have the user input
  // how much damage is being taken and of what type (physical, mystic, or
  // direct) then add that much minus the relevant armor to the damage. Likewise
  // the healing button should instead take input on how much to heal, giving
  // easy access to the character's recovery step and tests remaining.

  type Thresholds = { unconsciousness: number; death: number; wound: number };
  export let thresholds: Thresholds;
  // TODO: Deal with wounds
  export let wounds: number;
  export let damage: number;
  export let bloodDamage: number;
  type Recovery = { max: number; remaining: number; step: number };
  // TODO: Implement recovery tests
  export let recovery: Recovery;

  const deal1Damage = () => (damage += 1);
  const recover1Health = () => (damage -= 1);

  $: totalDamage = damage + bloodDamage;
</script>

<Block padding="square">
  <div class="health">
    <div class="damage">
      <!-- <base-button
        class="damage"
        type="danger"
        style="font-size: 1rem"
        :icon="['fas', 'minus']"
        v-b-tooltip.hover.down
        title="Deal Damage"
        :disabled="disabled || invalid"
        on:click={deal1Damage}
      /> -->

      <!-- <button on:click={deal1Damage}>-</button> -->
      <Button
        type="danger"
        block
        fill
        padding="0"
        fontSize="2em"
        on:click={deal1Damage}
        text="–"
      />
    </div>

    <div class="health-bar">
      <HealthBar
        damage={totalDamage}
        unconsciousness={thresholds.unconsciousness}
        death={thresholds.death}
      />
    </div>

    <div class="recover">
      <!-- <base-button
        class="recover"
        type="success"
        style="font-size: 1rem"
        :icon="['fas', 'plus']"
        v-b-tooltip.hover.down
        title="Recover Health"
        :disabled="disabled || invalid"
        on:click={recover1Health}
      /> -->

      <!-- <button on:click={recover1Health}>+</button> -->
      <Button
        type="success"
        block
        fill
        padding="0"
        fontSize="2em"
        on:click={recover1Health}
        text="+"
      />
    </div>
  </div>
</Block>

<style lang="less">
  .health {
    display: grid;
    grid-template-columns: 3em auto 3em;
    grid-template-rows: auto;
    grid-template-areas: "damage bar recover";
    gap: 0.5em;

    .damage {
      grid-area: damage;
    }
    .health-bar {
      grid-area: bar;
    }
    .recover {
      grid-area: recover;
    }
  }
</style>
