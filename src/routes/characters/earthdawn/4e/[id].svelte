<script lang="ts" context="module">
  import type { Character } from "$lib/types";
  import type { Load } from "@sveltejs/kit";
  import { get } from "$lib/util";

  export const load: Load = async ({ fetch, page }) => {
    const { id } = page.params;
    console.log(`Fetching character '${id}'`);

    const character = await get<Character>(fetch, `/api/v1/character/${id}`);
    return { props: { character } };
  };
</script>

<script lang="ts">
  import CharacterSheet from "$theme/characterSheet.svelte";

  import Earthdawn4eHealthBlock from "$theme/blocks/systems/earthdawn/4e/health.svelte";
  import Earthdawn4eDefenseBlock from "$theme/blocks/systems/earthdawn/4e/defense.svelte";
  import Earthdawn4eArmorBlock from "$theme/blocks/systems/earthdawn/4e/armor.svelte";
  import Earthdawn4eShieldBlock from "$theme/blocks/systems/earthdawn/4e/shield.svelte";
  import Earthdawn4eStatBlock from "$theme/blocks/systems/earthdawn/4e/stats.svelte";

  import type { Earthdawn4eCharacter } from "$types/systems/earthdawn/4e";
  export let character: Earthdawn4eCharacter;
</script>

<!-- TODO: Remove the system prefix from the name -->
<CharacterSheet
  name="Earthdawn 4e: {character.name}"
  avatarUrl={character.avatarUrl}
>
  <!-- Health -->
  <Earthdawn4eHealthBlock slot="health" {...character.health} />

  <!-- Defense -->
  <Earthdawn4eDefenseBlock {...character.defense} />

  <!-- Armor -->
  <Earthdawn4eArmorBlock {...character.armor} />

  <!-- Shield -->
  <Earthdawn4eShieldBlock {...character.shield} />

  <!-- Other stats (movement rate, carry capacity, initiative) -->
  <Earthdawn4eStatBlock {...character.stats} />

  <!-- Karma -->
  <!-- Attributes -->
  <!-- Talents -->
  <!-- Skills -->
  <!-- Weapons -->
</CharacterSheet>
