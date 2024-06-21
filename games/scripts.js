document.addEventListener('DOMContentLoaded', () => {
  const characters = document.querySelectorAll('.character');
  const startGameButton = document.getElementById('start-game');
  const gameContent = document.getElementById('game-content');
  let selectedCharacters = [];
  let currentQuest = 0;

  const quests = [
      {
          title: "The Dark Forest",
          description: "The team enters the dark forest, where danger lurks around every corner. Prepare for battle!",
          boss: "Shadow Beast"
      },
      {
          title: "The Mystic Cave",
          description: "Deep within the Mystic Cave, the team encounters glowing crystals and eerie echoes. A formidable enemy awaits!",
          boss: "Crystal Guardian"
      },
      {
          title: "The Enchanted Lake",
          description: "The Enchanted Lake's waters shimmer with magic. The team must face a powerful water spirit!",
          boss: "Water Serpent"
      },
      {
          title: "The Sky Fortress",
          description: "High above the clouds, the Sky Fortress is home to dangerous flying creatures. The team prepares for an aerial battle!",
          boss: "Storm Dragon"
      },
      {
          title: "The Lava Pits",
          description: "The Lava Pits are filled with molten rock and fire. The team faces the final challenge: a fiery monster!",
          boss: "Magma Titan"
      }
  ];

  characters.forEach(character => {
      character.addEventListener('click', () => {
          const characterName = character.getAttribute('data-character');
          if (selectedCharacters.includes(characterName)) {
              selectedCharacters = selectedCharacters.filter(c => c !== characterName);
              character.classList.remove('selected');
          } else if (selectedCharacters.length < 5) {
              selectedCharacters.push(characterName);
              character.classList.add('selected');
          }

          startGameButton.style.display = selectedCharacters.length > 0 ? 'block' : 'none';
      });
  });

  startGameButton.addEventListener('click', () => {
      startGame(selectedCharacters);
  });

  function startGame(characters) {
      gameContent.innerHTML = `
          <h2>Welcome, Team!</h2>
          <p>Your adventure begins now. Complete quests, defeat bosses, and save Eryndor!</p>
          <button id="start-quest">Start Quest</button>
      `;

      document.getElementById('start-quest').addEventListener('click', () => {
          loadQuest(currentQuest, characters);
      });
  }

  function loadQuest(questIndex, characters) {
      if (questIndex >= quests.length) {
          gameContent.innerHTML = `
              <h2>Congratulations!</h2>
              <p>Your team has completed all the quests and saved Eryndor!</p>
              <button id="play-again">Play Again</button>
          `;
          document.getElementById('play-again').addEventListener('click', () => {
              location.reload();
          });
          return;
      }

      const quest = quests[questIndex];

      gameContent.innerHTML = `
          <h2>Quest ${questIndex + 1}: ${quest.title}</h2>
          <p>${quest.description}</p>
          <button id="battle-boss">Battle Boss</button>
      `;

      document.getElementById('battle-boss').addEventListener('click', () => {
          battleBoss(quest.boss, characters);
      });
  }

  function battleBoss(boss, characters) {
      gameContent.innerHTML = `
          <h2>Boss Fight: ${boss}</h2>
          <p>The team faces the fearsome ${boss}! Choose your actions:</p>
          ${characters.map(character => `
              <div class="character-action">
                  <h3>${capitalize(character)}</h3>
                  <button class="action" data-character="${character}" data-action="attack">Attack</button>
                  <button class="action" data-character="${character}" data-action="defend">Defend</button>
                  <button class="action" data-character="${character}" data-action="special">Special Ability</button>
              </div>
          `).join('')}
          <button id="resolve-actions">Resolve Actions</button>
      `;

      const actionButtons = document.querySelectorAll('.action');
      actionButtons.forEach(button => {
          button.addEventListener('click', (event) => {
              const characterActionDiv = event.target.parentElement;
              const actionBtns = characterActionDiv.querySelectorAll('.action');
              actionBtns.forEach(btn => btn.classList.remove('selected'));
              button.classList.add('selected');
          });
      });

      document.getElementById('resolve-actions').addEventListener('click', () => {
          resolveActions(characters);
      });
  }

  function resolveActions(characters) {
      const actions = document.querySelectorAll('.action.selected');
      let outcomes = [];

      actions.forEach(action => {
          const character = action.getAttribute('data-character');
          const actionType = action.getAttribute('data-action');
          let outcome;
          switch(actionType) {
              case 'attack':
                  outcome = `${capitalize(character)} attacks the boss with a powerful strike!`;
                  break;
              case 'defend':
                  outcome = `${capitalize(character)} defends against the boss's attack!`;
                  break;
              case 'special':
                  outcome = `${capitalize(character)} uses a special ability to unleash devastating damage!`;
                  break;
          }
          outcomes.push(outcome);
      });

      gameContent.innerHTML = `
          <h2>Outcome</h2>
          <p>${outcomes.join('<br>')}</p>
          <button id="next-quest">Next Quest</button>
      `;

      document.getElementById('next-quest').addEventListener('click', () => {
          currentQuest++;
          loadQuest(currentQuest, characters);
      });
  }

  function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
  }
});