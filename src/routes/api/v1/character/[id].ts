// Route: /api/v1/character/[id]

import type { ApiRequestHandler } from "$api/v1/_types";
import type { Character } from "$lib/types";
import type { Earthdawn4eCharacter } from "$types/systems/earthdawn/4e";
import { assertValidSystem } from "$lib/systems";

export const get: ApiRequestHandler<any, Character> = req => {
  const { id } = req.params;

  // TODO: Actually fetch this data from somewhere.
  const char: Earthdawn4eCharacter = {
    system: "earthdawn/4e",
    name: "Jata Okar",
    avatarUrl: "",

    health: {
      thresholds: {
        unconsciousness: 43,
        death: 52,
        wound: 15,
      },
      wounds: 0,
      // damage: 14,
      damage: 0,
      bloodDamage: 0,
      recovery: {
        max: 4,
        remaining: 4,
        step: 8,
      },
    },

    defense: {
      physical: 8,
      mystic: 8,
      social: 6,
    },

    armor: {
      physical: 3,
      mystic: 2,
    },

    shield: {
      physical: 0,
      mystic: 0,
    },

    stats: {
      movementRate: 10,
      carryingCapacity: 235,
      initiative: 6,
    },

    karma: {
      max: 5,
      used: 1,
    },

    attributes: {
      dexterity: { value: 13, step: 6 },
      strength: { value: 19, step: 8 },
      toughness: { value: 16, step: 8 },
      perception: { value: 13, step: 6 },
      willpower: { value: 10, step: 5 },
      charisma: { value: 10, step: 5 },
    },
  };

  assertValidSystem(char.system, id);
  return { body: char };
};
