let playerCharacter;
let lives = 5;

// Define characters and quests
const characters = [
  { name: "Adam (vampire)", quests: ["Quest 1: Find the Lost Amulet", "Quest 2: Retrieve the Spellbook"] },
  { name: "Sorceresse (spell caster)", quests: ["Quest 3: Uncover the Hidden Scroll", "Quest 4: Defeat the Dark Mage"] },
  { name: "Hasuro (goblin shifter)", quests: ["Quest 5: Infiltrate the Goblin Kingdom", "Quest 6: Steal the Magic Crystal"] },
  { name: "Sakuria (human princess)", quests: ["Quest 7: Rescue the Enchanted Creatures", "Quest 8: Restore the Sacred Tree"] }
];

// Function to select a character
function selectCharacter() {
  let characterOptions = "Choose your character:\n";
  for (let i = 0; i < characters.length; i++) {
    characterOptions += `${i + 1}: ${characters[i].name}\n`;
  }

  const characterIndex = prompt(characterOptions);
  playerCharacter = characters[characterIndex - 1];

  if (!playerCharacter) {
    alert("Invalid choice. Please select a character.");
    selectCharacter();
  }
}

// Function to complete a quest
function completeQuest(questIndex) {
  alert(`Congratulations! You have completed ${playerCharacter.quests[questIndex]}`);
  playerCharacter.quests.splice(questIndex, 1);
}

// Game loop
selectCharacter();
while (playerCharacter.quests.length > 0 && lives > 0) {
  let questOptions = "Choose a quest:\n";
  for (let i = 0; i < playerCharacter.quests.length; i++) {
    questOptions += `${i + 1}: ${playerCharacter.quests[i]}\n`;
  }

  const questIndex = prompt(questOptions);
  if (questIndex >= 1 && questIndex <= playerCharacter.quests.length) {
    completeQuest(questIndex - 1);
  } else {
    alert("Invalid choice. Please select a quest.");
  }
}

// Game over message
if (lives > 0) {
  alert("Congratulations! You've saved the fantasy world from evil darkness.");
} else {
  alert("Game over! You've run out of lives.");
}

alert("Thank you for playing!");
