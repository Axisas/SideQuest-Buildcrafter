// List of all the skills and setbonuses available
const skillList = {
  WeaknessExploit: `Weakness Exploit grants the user 10%/15%/30% affinity (chance to do 125% damage) on weak spots,
   with an added 5%/15%/20% affinity on wounded parts, weak spots are spots with a hitzone of 45 or higher,
    which results in orange damage numbers. Wounding is done through the clutch claw.`,

  Guard: `Guard reduces the knockback and chip damage of attacks and reduces stamina depletion by 0%/15%/15%/30%/50% when blocking,
    the knockback gets reduced in tiers every two levels, starting from level 1.
    This means that odd numbers of this skill have greater effects.`,

  Agitator: `Agitator activates when a monster is enraged, which can be seen by the red eye icon on the minimap,
   it gives the user 4/8/12/16/20 raw attack and 5%/5%/7%/7%/10% affinity (chance to do 125% damage).`,

  BlastAttack: `Blast Attack increases the rate of blast buildup when wielding a weapon with blast status,
   it increases it by 5%/10%/20%/30% with a raw 10 bonus to the buildup.
    Blast is a status effect which gets added on a third of the users' attacks,
    when a threshold is met, this does 300 damage to the monster.`,

  // Since greatsword and hammer are the only selectable weapons,
  // the user is told this skill has no effect, since it does nothing for these weapons.
  Artillery: `Artillery increases the damage of explosive attacks by 10%/20%/30%
   and reduces the cooldown of gunlances' WyvernFire attack by 15%/30%/50%. This skill has no effect for the current weapon.`,

  SpeedSharpening: `Speed Sharpening reduces 1/2/3 cycles from the sharpening process, this does not stack with other sharpening speed effects.`,

  DefenseBoost: `Defense Boost increases the users' defense by 5/10/5% + 10/5% + 20/8% + 20/8% + 35/10% + 35
   as well as increasing all elemental resistances by 3/3/5/5 at levels 4 - 8`,

  // It also increases gauge fill rate by 5%/10%/20%, but this is again not relevant for the available weapons
  Focus: {
    GreatSword: `Focus increases the charge rate of charged attacks by 5%/10%/15%, 
    for greatsword this speeds up the animation between charged attacks.
     This skill is heavily recommended for this weapon.`,
    Hammer: `Focus increases the charge rate of charged attacks by 5%/10%/15%,
     for hammer this reduces the charge time of these attacks.`,
  },

  Handicraft: `Handicraft increases the sharpness gauge by 10/20/30/40/50,
   allowing for more attacks. Sharpness reduces at -1 per hit.`,

  LatentPower: `When latent power activates, it increases affinity by 10%/20%/30%/40%/50% 
  and reduces stamina consumption by 30%/30%/50%/50%/50%. 
  It activates after taking a total of 180 damage or 300 seconds have passed since the last deactivation or start of the hunt. 
  It lasts 120 seconds.`,

  CriticalEye: `Critical eye increases affinity (chance to hit for 125% damage) by 5%/10%/15%/20%/25%/30%/40%.`,
  SpecialAmmoBoost: `Special Ammo Boost increases the power of special ammo,
   the dragon piercer and thousand dragons by 10%/20%, this skill has no effect for this weapon.`,

  HeatGuard: `Heat Guard nullifies heat damage, which is caused by hot areas, lava, Teostra's heat aura and Lunastra's blue flames.`,

  AgitatorSecret: `Agitator Secret adds two possible levels to the agitator skill,
   which grant 24/28 raw attack and 15%/20% affinity.`,
  ArtillerySecret: `Artillery Secret adds two possible levels to the artillery skill,
   which increases the power by 40%/50% and reduces the cooldown by 60%/70%.`,

  MastersTouch: `Master's Touch prevents sharpness loss on hitting a critical hit, which happen based on affinity.`,
};
