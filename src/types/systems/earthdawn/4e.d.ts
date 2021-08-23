import type { Character } from "$lib/types";

// TODO: Track where values come from
// export type Calculated<T> = { val: T; sources: Sources };

export type Attribute = { value: number; step: number };

export interface Earthdawn4eCharacter extends Character {
  system: "earthdawn/4e";

  health: {
    thresholds: {
      unconsciousness: number;
      death: number;
      wound: number;
    };
    wounds: number;
    damage: number;
    bloodDamage: number;
    recovery: {
      max: number;
      remaining: number;
      step: number;
    };
  };

  defense: {
    physical: number;
    mystic: number;
    social: number;
  };

  armor: {
    physical: number;
    mystic: number;
  };

  shield: {
    physical: number;
    mystic: number;
  };

  stats: {
    movementRate: number;
    carryingCapacity: number;
    initiative: number;
  };

  karma: {
    max: number;
    used: number;
  };

  attributes: {
    dexterity: Attribute;
    strength: Attribute;
    toughness: Attribute;
    perception: Attribute;
    willpower: Attribute;
    charisma: Attribute;
  };
}
