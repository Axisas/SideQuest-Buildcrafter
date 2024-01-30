const rankSelectButtons = document.querySelectorAll(".rankselect");
let selectedRank = "mr";
let selectedWeaponType;
let availableWeapons = [];

let chosenWeapon;

let chosenHelm;
let chosenChest;
let chosenArms;
let chosenWaist;
let chosenLegs;

let lastChosenHelm;
let lastChosenChest;
let lastChosenArms;
let lastChosenWaist;
let lastChosenLegs;

let availableSlots = {
  weaponSlots: 0,
  helmSlots: 0,
  chestSlots: 0,
  armsSlots: 0,
  waistSlots: 0,
  legsSlots: 0,
};
let slots;

let activeSkills = {};
let activeSetBonuses = {};

let explainBox = document.querySelector(".skillexplain");
explainBox.style.display = "none";
// Hides the box when the user clicks on it
explainBox.addEventListener("click", function () {
  explainBox.style.display = "none";
});

function toggleDropdown(event) {
  this.classList.toggle("open");
}

function rankButtonPressed() {
  rankSelectButtons.forEach((button) => {
    button.classList.remove("clicked");
  });
  this.classList.add("clicked");
  // accesses the second class of the clicked button, which in this case will always be a rank
  if (this.classList.item(1) != null) {
    selectedRank = this.classList.item(1);
  }
}

// Eventlisteners
for (let i = 0; i < rankSelectButtons.length; i++) {
  rankSelectButtons[i].addEventListener("click", rankButtonPressed);
}

document.querySelectorAll(".dropdown").forEach((element) => {
  element.addEventListener("click", toggleDropdown);
});

document
  .querySelector(".selectweapon")
  .addEventListener("click", selectWeaponType);

document
  .querySelector(".specificweapon")
  .addEventListener("click", selectSpecificWeapon);

document.querySelectorAll(".specificgear").forEach((element) => {
  element.addEventListener("click", selectSpecificGear);
});

function fillWeaponDropDown() {
  let row = document.querySelector(".weaponchoices");
  if (row) {
    // clears all selectable options before adding in new ones
    while (row.firstChild) {
      row.removeChild(row.firstChild);
    }
    if (availableWeapons.length > 0) {
      for (let i = 0; i < availableWeapons.length; i++) {
        let el = document.createElement("div");

        el.classList.add("gear");
        el.textContent = availableWeapons[i].name;
        el.value = availableWeapons[i];

        row.appendChild(el);
      }
    }
  }
}

function fillArmorDropDowns() {
  let gearCount = document.querySelectorAll(".gearchoice");
  gearCount.forEach((gearPiece) => {
    let gearType = gearPiece.classList.item(1);

    while (gearPiece.firstChild) {
      gearPiece.removeChild(gearPiece.firstChild);
    }

    let availableGear = [];
    let gearObjects = masterRankGear.filter((obj) => obj.type === gearType);
    gearObjects.forEach((obj) => {
      availableGear.push(obj);
    });

    if (availableGear.length > 0) {
      for (let i = 0; i < availableGear.length; i++) {
        let el = document.createElement("div");
        el.classList.add("gear");
        el.textContent = availableGear[i].name;
        el.value = availableGear[i];
        gearPiece.appendChild(el);
      }
    }
  });
}

function selectWeaponType(event) {
  // empties the availableWeapons before adding in values
  availableWeapons.length = 0;

  if (event.target.classList.contains("gear")) {
    selectedWeaponType = event.target.textContent;

    // Minor grammar check
    if (selectedWeaponType == "Dual Blades") {
      document
        .querySelectorAll(".differentweapon")
        .forEach(
          (element) => (element.innerHTML = "Select " + selectedWeaponType)
        );
    } else {
      document
        .querySelectorAll(".differentweapon")
        .forEach(
          (element) => (element.innerHTML = "Select a " + selectedWeaponType)
        );
    }
  }
  // This filters the chosen array on a specific property of the objects in the array
  if (selectedWeaponType) {
    let weaponObjects = masterRankWeapons.filter(
      (obj) => obj.weaponType === selectedWeaponType
    );

    if (weaponObjects.length > 0) {
      weaponObjects.forEach((obj) => {
        availableWeapons.push(obj);
      });
      document.querySelector(".buildcrafter").style.visibility = "visible";
      fillWeaponDropDown();
      fillArmorDropDowns();
    }
  }
}

function updateGearSlots(gearSlotType) {
  let displayedSlots;

  slots = slots.toString().split("").map(Number);
  if (slots.length > 0 && slots[0] != 0) {
    for (let i = 0; i < 3; i++) {
      if (slots[i]) {
        if (i == 0) {
          displayedSlots = slots[i] + "<br>";
        } else {
          displayedSlots += slots[i] + "<br>";
        }
      } else {
        displayedSlots += "- <br>";
      }
    }
    document.querySelector(`.${gearSlotType}`).innerHTML = displayedSlots;
  } else {
    // resets it to its first state
    document.querySelector(`.${gearSlotType}`).innerHTML =
      "- <br> - <br> - <br>";
  }
}

function displayStats() {
  if (chosenWeapon) {
    availableSlots.weaponSlots = chosenWeapon.slots;
    slots = availableSlots.weaponSlots;
    updateGearSlots("weaponslots");

    // Fills out the weapon stats
    document.querySelector(".currentweapon").innerHTML = chosenWeapon.name;

    document.querySelector(".currentrawdamage").innerHTML =
      chosenWeapon.rawDamage;

    document.querySelector(".currenteletype").innerHTML = chosenWeapon.eleType;

    document.querySelector(".currenteledamage").innerHTML =
      chosenWeapon.eleDamage;

    document.querySelector(".currentsharpness").innerHTML =
      chosenWeapon.sharpness;

    document.querySelector(".currentaffinity").innerHTML =
      chosenWeapon.affinity;

    document.querySelector(".currentelderseal").innerHTML =
      chosenWeapon.elderSeal;
  }
  if (chosenHelm) {
    availableSlots.helmSlots = chosenHelm.slots;
    slots = availableSlots.helmSlots;
    updateGearSlots("helmslots");

    document.querySelector(".currenthelm").innerHTML = chosenHelm.name;
    document.querySelector(".helmdropdown").innerHTML = chosenHelm.name;
  }
  if (chosenChest) {
    availableSlots.chestSlots = chosenChest.slots;
    slots = availableSlots.chestSlots;
    updateGearSlots("chestslots");

    document.querySelector(".currentchest").innerHTML = chosenChest.name;
    document.querySelector(".chestdropdown").innerHTML = chosenChest.name;
  }
  if (chosenArms) {
    availableSlots.armsSlots = chosenArms.slots;
    slots = availableSlots.armsSlots;
    updateGearSlots("armsslots");

    document.querySelector(".currentarms").innerHTML = chosenArms.name;
    document.querySelector(".armsdropdown").innerHTML = chosenArms.name;
  }
  if (chosenWaist) {
    availableSlots.waistSlots = chosenWaist.slots;
    slots = availableSlots.waistSlots;
    updateGearSlots("waistslots");

    document.querySelector(".currentwaist").innerHTML = chosenWaist.name;
    document.querySelector(".waistdropdown").innerHTML = chosenWaist.name;
  }
  if (chosenLegs) {
    availableSlots.legsSlots = chosenLegs.slots;
    slots = availableSlots.legsSlots;
    updateGearSlots("legsslots");

    document.querySelector(".currentlegs").innerHTML = chosenLegs.name;
    document.querySelector(".legsdropdown").innerHTML = chosenLegs.name;
  }
}

// Gets the data of the selected value from a dropdownlist and sends it to display
function selectSpecificWeapon(event) {
  chosenWeapon = event.target.value;
  displayStats();
}

function selectSpecificGear(event) {
  if (event.target.value.type == "helm") {
    if (chosenHelm) {
      if (lastChosenHelm != chosenHelm) {
        lastChosenHelm = chosenHelm;
      }
    }
    chosenHelm = event.target.value;
    showActiveSkills(chosenHelm, lastChosenHelm);
    displayStats();
    return;
  } else if (event.target.value.type == "chest") {
    if (chosenChest) {
      if (lastChosenChest != chosenChest) {
        lastChosenChest = chosenChest;
      }
    }
    chosenChest = event.target.value;
    showActiveSkills(chosenChest, lastChosenChest);
    displayStats();
    return;
  } else if (event.target.value.type == "arms") {
    if (chosenArms) {
      if (lastChosenArms != chosenArms) {
        lastChosenArms = chosenArms;
      }
    }
    chosenArms = event.target.value;
    showActiveSkills(chosenArms, lastChosenArms);
    displayStats();
    return;
  } else if (event.target.value.type == "waist") {
    if (chosenWaist) {
      if (lastChosenWaist != chosenWaist) {
        lastChosenWaist = chosenWaist;
      }
    }
    chosenWaist = event.target.value;
    showActiveSkills(chosenWaist, lastChosenWaist);
    displayStats();
    return;
  } else if (event.target.value.type == "legs") {
    if (chosenLegs) {
      if (lastChosenLegs != chosenLegs) {
        lastChosenLegs = chosenLegs;
      }
    }
    chosenLegs = event.target.value;
    showActiveSkills(chosenLegs, lastChosenLegs);
    displayStats();
    return;
  }
}

function toggleExplanation(event) {
  for (let skill in skillList) {
    if (skill == event.target.id) {
      if (event.target.id == "Focus") {
        for (let wpnType in skillList.Focus) {
          if (wpnType == selectedWeaponType) {
            console.log(Focus);

            explainBox.innerHTML = skillList.Focus[wpnType];
          }
        }
      } else {
        explainBox.innerHTML = skillList[skill];
      }
    }
  }

  // Toggle visibility of the explainbox, hiding it happens in line 37
  if (explainBox.style.display === "none") {
    explainBox.style.display = "block";
  }

  // explainBox.innerHTML = event.target.id;
}

function showActiveSkills(gear, oldgear) {
  // activeSkills is an object which stores all active skills as "skillname: skilllvl"

  if (oldgear) {
    if (oldgear.skill1) {
      // Removes the skilllvls of the old gear from the current list
      activeSkills[oldgear.skill1] -= oldgear.skill1lvl;
      if (activeSkills[oldgear.skill1] <= 0) {
        // Removes the skills from the object if their level is below zero when subtracting the old skill
        delete activeSkills[oldgear.skill1];
      }
      if (oldgear.skill2) {
        activeSkills[oldgear.skill2] -= oldgear.skill2lvl;
        if (activeSkills[oldgear.skill2] <= 0) {
          delete activeSkills[oldgear.skill2];
        }
      }
    }
  }

  // Check if armor has a skill
  if (gear.skill1) {
    // Check if the skill is already in the list
    if (activeSkills[gear.skill1]) {
      activeSkills[gear.skill1] += gear.skill1lvl;
      // replaces the existing text with the new skill lvl
    } else {
      // else it adds the skill to the object with a value of the skilllvl
      activeSkills[gear.skill1] = gear.skill1lvl;
    }
    if (gear.skill2) {
      if (activeSkills[gear.skill2]) {
        activeSkills[gear.skill2] += gear.skill2lvl;
      } else {
        activeSkills[gear.skill2] = gear.skill2lvl;
      }
    }
  }
  let activeSkillsText = document.querySelector(".activeskills");
  activeSkillsText.addEventListener("click", function (event) {
    if (event.target.classList.contains("bonus-span")) {
      toggleExplanation(event);
    }
  });

  activeSkillsText.innerHTML = "";
  for (skills in activeSkills) {
    activeSkillsText.innerHTML += `<span class="bonus-span" id="${skills}">${skills} : ${activeSkills[skills]} </span><br>`;
  }

  // Does the exact same, but now for setbonuses
  if (oldgear) {
    if (oldgear.setbonus1) {
      // decrements the tracker mentioned below
      activeSetBonuses[oldgear.setbonus1][1]--;
      if (activeSetBonuses[oldgear.setbonus1][1] <= 0) {
        delete activeSetBonuses[oldgear.setbonus1];
      }
      if (oldgear.skill2) {
        activeSetBonuses[oldgear.setbonus2][1]--;
        if (activeSetBonuses[oldgear.setbonus2][1] <= 0) {
          delete activeSetBonuses[oldgear.setbonus2];
        }
      }
    }
  }

  if (gear.setbonus1) {
    if (activeSetBonuses[gear.setbonus1]) {
      // Adds another armor piece to the tracker mentioned below
      activeSetBonuses[gear.setbonus1][1]++;
    } else {
      // Sets a property, the second value keeps track of how many armor pieces have this set bonus
      activeSetBonuses[gear.setbonus1] = [gear.setbonus1threshold, 1];
    }
    if (gear.setbonus2) {
      if (activeSetBonuses[gear.setbonus2]) {
        activeSetBonuses[gear.setbonus2][1]++;
      } else {
        activeSetBonuses[gear.setbonus2] = [gear.setbonus2threshold, 1];
      }
    }
  }

  let activeBonusesText = document.querySelector(".setbonuses");

  activeBonusesText.addEventListener("click", function (event) {
    if (event.target.classList.contains("bonus-span")) {
      toggleExplanation(event);
    }
  });
  activeBonusesText.innerHTML = "";
  for (bonuses in activeSetBonuses) {
    activeBonusesText.innerHTML += `<span class="bonus-span" id="${bonuses}">${bonuses} : ${activeSetBonuses[bonuses][1]} 
    / ${activeSetBonuses[bonuses][0]} </span><br>`;
  }
}
