document.addEventListener('DOMContentLoaded', () => {
  const characters = document.querySelectorAll('.character');
  const startGameButton = document.getElementById('start-game');
  const gameContent = document.getElementById('game-content');
  let selectedCharacters = [];

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
          loadQuest(characters);
      });
  }

  function loadQuest(characters) {
      gameContent.innerHTML = `
          <h2>Quest 1: The Dark Forest</h2>
          <p>The team enters the dark forest, where danger lurks around every corner. Prepare for battle!</p>
          <button id="battle-boss">Battle Boss</button>
      `;

      document.getElementById('battle-boss').addEventListener('click', () => {
          battleBoss(characters);
      });
  }

  function battleBoss(characters) {
      gameContent.innerHTML = `
          <h2>Boss Fight: Shadow Beast</h2>
          <p>The team faces the fearsome Shadow Beast! Choose your actions:</p>
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
          button.addEventListener('click', () => {
              button.classList.toggle('selected');
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
                  outcome = `${capitalize(character)} attacks the Shadow Beast with a powerful strike!`;
                  break;
              case 'defend':
                  outcome = `${capitalize(character)} defends against the Shadow Beast's attack!`;
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
          loadQuest(characters);
      });
  }

  function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
  }
});