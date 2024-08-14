const typeChart = {
  normal: {
    normal: 1,
    fire: 1,
    water: 1,
    electric: 1,
    grass: 1,
    ice: 1,
    fighting: 1,
    poison: 1,
    ground: 1,
    flying: 1,
    psychic: 1,
    bug: 1,
    rock: 0.5,
    ghost: 0,
    dragon: 1,
    dark: 1,
    steel: 0.5,
    fairy: 1,
  },
  fire: {
    normal: 1,
    fire: 0.5,
    water: 0.5,
    electric: 1,
    grass: 2,
    ice: 2,
    fighting: 1,
    poison: 1,
    ground: 1,
    flying: 1,
    psychic: 1,
    bug: 2,
    rock: 0.5,
    ghost: 1,
    dragon: 0.5,
    dark: 1,
    steel: 2,
    fairy: 1,
  },
  water: {
    normal: 1,
    fire: 2,
    water: 0.5,
    electric: 1,
    grass: 0.5,
    ice: 1,
    fighting: 1,
    poison: 1,
    ground: 2,
    flying: 1,
    psychic: 1,
    bug: 1,
    rock: 2,
    ghost: 1,
    dragon: 0.5,
    dark: 1,
    steel: 1,
    fairy: 1,
  },
  electric: {
    normal: 1,
    fire: 1,
    water: 2,
    electric: 0.5,
    grass: 0.5,
    ice: 1,
    fighting: 1,
    poison: 1,
    ground: 0,
    flying: 2,
    psychic: 1,
    bug: 1,
    rock: 1,
    ghost: 1,
    dragon: 0.5,
    dark: 1,
    steel: 1,
    fairy: 1,
  },
  grass: {
    normal: 1,
    fire: 0.5,
    water: 2,
    electric: 1,
    grass: 0.5,
    ice: 1,
    fighting: 1,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    psychic: 1,
    bug: 0.5,
    rock: 2,
    ghost: 1,
    dragon: 0.5,
    dark: 1,
    steel: 0.5,
    fairy: 1,
  },
  ice: {
    normal: 1,
    fire: 0.5,
    water: 0.5,
    electric: 1,
    grass: 2,
    ice: 0.5,
    fighting: 1,
    poison: 1,
    ground: 2,
    flying: 2,
    psychic: 1,
    bug: 1,
    rock: 1,
    ghost: 1,
    dragon: 2,
    dark: 1,
    steel: 0.5,
    fairy: 1,
  },
  fighting: {
    normal: 2,
    fire: 1,
    water: 1,
    electric: 1,
    grass: 1,
    ice: 2,
    fighting: 1,
    poison: 0.5,
    ground: 1,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    ghost: 0,
    dragon: 1,
    dark: 2,
    steel: 2,
    fairy: 0.5,
  },
  poison: {
    normal: 1,
    fire: 1,
    water: 1,
    electric: 1,
    grass: 2,
    ice: 1,
    fighting: 1,
    poison: 0.5,
    ground: 0.5,
    flying: 1,
    psychic: 1,
    bug: 1,
    rock: 0.5,
    ghost: 0.5,
    dragon: 1,
    dark: 1,
    steel: 0,
    fairy: 2,
  },
  ground: {
    normal: 1,
    fire: 2,
    water: 1,
    electric: 2,
    grass: 0.5,
    ice: 1,
    fighting: 1,
    poison: 2,
    ground: 1,
    flying: 0,
    psychic: 1,
    bug: 0.5,
    rock: 2,
    ghost: 1,
    dragon: 1,
    dark: 1,
    steel: 2,
    fairy: 1,
  },
  flying: {
    normal: 1,
    fire: 1,
    water: 1,
    electric: 0.5,
    grass: 2,
    ice: 1,
    fighting: 2,
    poison: 1,
    ground: 1,
    flying: 1,
    psychic: 1,
    bug: 2,
    rock: 0.5,
    ghost: 1,
    dragon: 1,
    dark: 1,
    steel: 0.5,
    fairy: 1,
  },
  psychic: {
    normal: 1,
    fire: 1,
    water: 1,
    electric: 1,
    grass: 1,
    ice: 1,
    fighting: 2,
    poison: 2,
    ground: 1,
    flying: 1,
    psychic: 0.5,
    bug: 1,
    rock: 1,
    ghost: 1,
    dragon: 1,
    dark: 0,
    steel: 0.5,
    fairy: 1,
  },
  bug: {
    normal: 1,
    fire: 0.5,
    water: 1,
    electric: 1,
    grass: 2,
    ice: 1,
    fighting: 0.5,
    poison: 0.5,
    ground: 1,
    flying: 0.5,
    psychic: 2,
    bug: 1,
    rock: 1,
    ghost: 0.5,
    dragon: 1,
    dark: 2,
    steel: 0.5,
    fairy: 0.5,
  },
  rock: {
    normal: 1,
    fire: 2,
    water: 1,
    electric: 1,
    grass: 1,
    ice: 2,
    fighting: 0.5,
    poison: 1,
    ground: 0.5,
    flying: 2,
    psychic: 1,
    bug: 2,
    rock: 1,
    ghost: 1,
    dragon: 1,
    dark: 1,
    steel: 0.5,
    fairy: 1,
  },
  ghost: {
    normal: 0,
    fire: 1,
    water: 1,
    electric: 1,
    grass: 1,
    ice: 1,
    fighting: 1,
    poison: 1,
    ground: 1,
    flying: 1,
    psychic: 2,
    bug: 1,
    rock: 1,
    ghost: 2,
    dragon: 1,
    dark: 0.5,
    steel: 1,
    fairy: 1,
  },
  dragon: {
    normal: 1,
    fire: 1,
    water: 1,
    electric: 1,
    grass: 1,
    ice: 1,
    fighting: 1,
    poison: 1,
    ground: 1,
    flying: 1,
    psychic: 1,
    bug: 1,
    rock: 1,
    ghost: 1,
    dragon: 2,
    dark: 1,
    steel: 0.5,
    fairy: 0,
  },
  dark: {
    normal: 1,
    fire: 1,
    water: 1,
    electric: 1,
    grass: 1,
    ice: 1,
    fighting: 0.5,
    poison: 1,
    ground: 1,
    flying: 1,
    psychic: 2,
    bug: 1,
    rock: 1,
    ghost: 2,
    dragon: 1,
    dark: 0.5,
    steel: 1,
    fairy: 0.5,
  },
  steel: {
    normal: 1,
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    grass: 1,
    ice: 2,
    fighting: 1,
    poison: 1,
    ground: 1,
    flying: 1,
    psychic: 1,
    bug: 1,
    rock: 2,
    ghost: 1,
    dragon: 1,
    dark: 1,
    steel: 0.5,
    fairy: 2,
  },
  fairy: {
    normal: 1,
    fire: 0.5,
    water: 1,
    electric: 1,
    grass: 1,
    ice: 1,
    fighting: 2,
    poison: 0.5,
    ground: 1,
    flying: 1,
    psychic: 1,
    bug: 1,
    rock: 1,
    ghost: 1,
    dragon: 2,
    dark: 2,
    steel: 0.5,
    fairy: 1,
  },
};

function damageMultiplier(pokemonType, attackType) {
  return typeChart[attackType][pokemonType]
}

function calculateModifiers({
  targetStatus = "",
  targetAbility = "",
  targetPassive = [""],
  moveUsed = "",
  targetItem = {name: "", type: "", multilplier: ""},
  attackerItem = {name: "", type: "", multilplier: ""},
  attackerAbility = "",
  moveType = "",
  moveCategory = "physical",
  moveName = "",
  moveTypeEffectiveness = { type1: 1, type2: 1 },
  isStab = false,
  isCriticalHit = false,
  isDoubleBattle = false,
  numTargets = 1,
  weather = "clear"
}) {
  // Burn modifier
  const burn = (targetStatus==="burned") && !(targetAbility==="guts") && moveCategory === "physical" ? 0.5 : 1;

  // Screen modifier
  let screen = 1;
  if (moveCategory === "physical" && ("reflect" in targetPassive)) {
    screen = isDoubleBattle && numTargets > 1 ? 2 / 3 : 0.5;
  } else if (moveCategory === "special" && ("light-screen" in targetPassive)) {
    screen = isDoubleBattle && numTargets > 1 ? 2 / 3 : 0.5;
  }
  if (isCriticalHit) {
    screen = 1;
  }

  // Targets modifier
  const targets = isDoubleBattle && numTargets > 1 ? 0.75 : 1;

  // Weather modifier
  let weatherModifier = 1;
  if (weather === "rain") {
    if (moveType === "water") weatherModifier = 1.5;
    if (moveType === "fire") weatherModifier = 0.5;
  } else if (weather === "sunlight") {
    if (moveType === "fire") weatherModifier = 1.5;
    if (moveType === "water") weatherModifier = 0.5;
  }
  if (["hail", "sandstorm", "fog"].includes(weather)) {
    if (moveName === "solar-beam") weatherModifier = 0.5;
  }
  if (attackerAbility === "cloud-nine" || attackerAbility === "air-lock") {
    weatherModifier = 1;
  }

  // Flash Fire modifier (FF)
  const flashFire =
    moveType === "fire" && attackerAbility === "flash-fire"
      ? 1.5
      : 1;

  // Critical hit modifier
  let critical = 1;
  if (isCriticalHit) {
    critical = attackerAbility === "sniper" ? 3 : 2;
  }
  if (
    ["future-sight", "doom-desire"].includes(moveUsed) ||
    targetAbility === "battle-armor" ||
    targetAbility === "shell-armor" ||
    targetAbility === "lucky-chant"
  ) {
    critical = 1;
  }

  // Item modifier
  let item = 1;
  if ((attackerItem.name === "life-orb")) {
    item = 1.3;
  }

  // Me First modifier
  //const meFirst = isMeFirst ? 1.5 : 1;

  // Random modifier
  const randomFactor =
    moveUsed === "spit-up" ? 1 : Math.floor(Math.random() * 16 + 85) / 100;

  // STAB modifier
  let stab = 1;
  if (isStab) {
    stab = attackerAbility === "adaptability" ? 2 : 1.5;
  }

  // Type effectiveness modifiers
  const type1 = moveTypeEffectiveness.type1;
  const type2 = moveTypeEffectiveness.type2;

  // Solid Rock/Filter modifier (SRF)
  const srf =
    (moveTypeEffectiveness.type1 > 1 || moveTypeEffectiveness.type2 > 1) &&
    targetAbility === "solid-rock" &&
    attackerAbility !== "mold-breaker"
      ? 0.75
      : 1;

  // Expert Belt modifier (EB)
  const expertBelt =
    (moveTypeEffectiveness.type1 > 1 || moveTypeEffectiveness.type2 > 1) &&
    (attackerItem === "expert-belt")
      ? 1.2
      : 1;

  // Tinted Lens modifier (TL)
  const tintedLens =
    (moveTypeEffectiveness.type1 < 1 || moveTypeEffectiveness.type2 < 1) &&
    attackerAbility === "tinted-lens"
      ? 2
      : 1;

  // Berry modifier
  const berry =
    (moveTypeEffectiveness.type1 > 1 || moveTypeEffectiveness.type2 > 1) &&
    (targetItem.type === "berry")
      ? 0.5
      : 1;

  return {
    burn,
    screen,
    targets,
    weatherModifier,
    flashFire,
    critical,
    item,
    randomFactor,
    stab,
    type1,
    type2,
    srf,
    expertBelt,
    tintedLens,
    berry,
  };
}

/**
 * Calculates the damage dealt by a Pokémon move based on various factors.
 *
 * @param {Object} params - An object containing all necessary parameters.
 * @param {Array} params.targetTypes - Types of the attacking Pokémon.
 * @param {Object} params.targetStats - Stats of the defending Pokémon.
 * @param {Object} params.targetStatus - Status effects on the defending Pokémon.
 * @param {String} params.targetAbility - Ability of the defending Pokémon.
 * @param {String} params.targetItem - Item held by the defending Pokémon.
 * @param {String} params.targetPassive - Passive effects on the defending Pokémon.
 * @param {Object} params.moveUsed - Details of the move being used.
 * @param {Number} params.attackerLevel - Level of the attacking Pokémon.
 * @param {String} params.attackerAbility - Ability of the attacking Pokémon.
 * @param {Object} params.attackerStats - Stats of the attacking Pokémon.
 * @param {String} params.attackerItem - Item held by the attacking Pokémon.
 * @param {String} params.moveName - Name of the move being used.
 * @param {String} params.moveType - Type of the move being used.
 * @param {Number} params.movePower - Power of the move being used.
 * @param {String} params.moveCategory - Category of the move ("physical" or "special").
 * @param {String} params.weather - Current weather condition.
 *
 * @returns {Number} - The final calculated damage.
 */
function calculateDamage({
  targetTypes,
  targetStats,
  targetStatus,
  targetAbility,
  targetItem,
  targetPassive,
  moveUsed,
  attackerLevel,
  attackerAbility,
  attackerStats,
  attackerItem,
  moveName,
  moveType,
  movePower,
  moveCategory,
  weather,
  isDoubleBattle,
  numTargets
}) {

  // Calculate type effectiveness for both of the user's types
  const moveTypeEffectiveness = {
    type1: targetTypes[0] ? damageMultiplier(targetTypes[0], moveType) : 1,
    type2: targetTypes[1] ? damageMultiplier(targetTypes[1], moveType) : 1
  };

  // Check if the move has STAB (Same-Type Attack Bonus)
  const isStab = targetTypes[0] === moveType || targetTypes[1] === moveType;

  // Determine if the move results in a critical hit (probability of 1/24)
  const isCriticalHit = (1 / 24) < Math.random();

  // Step 1: Calculate all the relevant modifiers
  const modifiers = calculateModifiers({
    targetStatus,
    targetAbility,
    targetPassive,
    targetAbility,
    moveUsed,
    targetItem,
    attackerItem,
    attackerAbility,
    moveType,
    moveCategory,
    moveName,
    moveTypeEffectiveness,
    isStab,
    isCriticalHit,
    isDoubleBattle,
    numTargets,
    weather
  });

  // Initialize attack and defense values
  let attack, defense = 1;

  // Step 2: Calculate base damage depending on whether the move is physical or special
  if (moveCategory === "physical") {
    attack = attackerStats.attack;
    defense = targetStats.defense;
  } else {
    attack = attackerStats.sp_attack;
    defense = targetStats.sp_defense;
  }
  const baseDamage =
    (((2 * attackerLevel) / 5 + 2) * movePower * (attack / defense)) / 50;
  let effectiveness = null;
  if (modifiers.type1 * modifiers.type2 >= 2) {
    effectiveness = "Super Effective"
  }
  else if (modifiers.type1 * modifiers.type2 == 0) {
    effectiveness = "Immune"
  }
  else if (modifiers.type1 * modifiers.type2 < 1){
    effectiveness = "Not Very Effective"
  }

  // Step 3: Apply all the modifiers to the base damage
  let finalDamage =
    ((baseDamage *
    modifiers.burn *
    modifiers.screen *
    modifiers.targets *
    modifiers.weatherModifier *
    modifiers.flashFire + 2) *
    modifiers.critical *
    modifiers.item *
    modifiers.randomFactor *
    modifiers.stab *
    modifiers.type1 *
    modifiers.type2 *
    modifiers.srf *
    modifiers.expertBelt *
    modifiers.tintedLens *
    modifiers.berry)
  
  // Return the final damage, rounded down to the nearest whole number
  return [Math.floor(finalDamage), effectiveness];
}

function willHit(targetStats, attackerStats, moveAccuracy) {
  // Calculate the hit probability
  const hitProbability = (attackerStats.accuracy ? attackerStats.accuracy : 100) * moveAccuracy * (100 - (targetStats.evasion ? targetStats.evasion : 15));

  // Generate a random number between 0 and 100
  const randomNumber = Math.random() * 100;

  // Determine if the attack hits
  return randomNumber <= hitProbability;
}

function getMovePriority(moveName) {
  const priorityTable = {
    "+5": ["helping-hand"],
    "+4": ["magic-coat", "snatch"],
    "+3": ["detect", "endure", "follow-me", "protect"],
    "+2": ["feint"],
    "+1": ["aqua-jet", "bide", "bullet-punch", "extreme-speed", "fake-out", "ice-shard", "mach-punch",
          "quick-attack", "shadow-sneak", "sucker-sunch", "vacuum-wave"],
    "0": [""],
    "-1": ["vital-throw"],
    "-3": ["focus-punch"],
    "-4": ["avalanche", "revenge"],
    "-5": ["counter", "mirror-coat"],
    "-6": ["roar", "whirlwind"],
    "-7": ["trick-room", "fleeing"]
  };

  for (const priority in priorityTable) {
    if (priorityTable[priority].includes(moveName)) {
      return parseInt(priority, 10);
    }
  }
  return 0; // Default priority for all other moves
}

function determineMoveOrder(targetMove, attackerMove, targetSpeed, attackerSpeed) {
  // Get priorities
  const targetPriority = getMovePriority(targetMove);
  const attackerPriority = getMovePriority(attackerMove);

  // Compare priorities
  if (attackerPriority > targetPriority) {
    return [attackerMove, targetMove];
  } else if (attackerPriority < targetPriority) {
    return [targetMove, attackerMove];
  } else {
    // If priorities are the same, compare speeds
    if (attackerSpeed > targetSpeed) {
      return [attackerMove, targetMove];
    } else if (attackerSpeed < targetSpeed) {
      return [targetMove, attackerMove];
    } else {
      // If both speeds are the same, it could be random or attacker first
      return [attackerMove, targetMove]; // or you can randomize
    }
  }
}

export {determineMoveOrder, willHit, calculateDamage}