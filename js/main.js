// PROFESSIONS DATABASE (Emoji & Name in Spanish)
const PROFESSIONS = [
  { emoji: '🚀', name: 'Astronauta' },
  { emoji: '👨‍🚒', name: 'Bombero' },
  { emoji: '🧪', name: 'Científico' },
  { emoji: '👨‍🍳', name: 'Cocinero' },
  { emoji: '🕵️', name: 'Detective' },
  { emoji: '👨‍⚕️', name: 'Doctor' },
  { emoji: '🎨', name: 'Artista' },
  { emoji: '👨‍🏫', name: 'Maestro' },
  { emoji: '👷', name: 'Constructor' },
  { emoji: '💻', name: 'Programador' },
  { emoji: '🎸', name: 'Músico' },
  { emoji: '🧑‍✈️', name: 'Piloto' }
];

// GAME STATE
let state = {
  difficulty: 'easy', // 'easy' (8 pairs) or 'hard' (12 pairs)
  cards: [],
  flippedCards: [],
  moves: 0,
  pairsMatched: 0,
  totalPairs: 8,
  timerInterval: null,
  secondsElapsed: 0,
  gameStarted: false,
  isLockBoard: false
};

// DOM ELEMENTS
const boardEl = document.getElementById('game-board');
const movesEl = document.getElementById('moves');
const timerEl = document.getElementById('timer');
const pairsEl = document.getElementById('pairs');
const restartBtn = document.getElementById('restart');
const difficultyBtn = document.getElementById('difficulty');
const difficultyText = document.getElementById('difficulty-text');

// Modal Elements
const modalOverlay = document.getElementById('modal-overlay');
const winModal = document.getElementById('win-modal');
const finalTimeEl = document.getElementById('final-time');
const finalMovesEl = document.getElementById('final-moves');
const finalStarsEl = document.getElementById('final-stars');
const playAgainBtn = document.getElementById('play-again');

// INITIALIZE GAME
document.addEventListener('DOMContentLoaded', () => {
  initGame();
  
  // Event Listeners
  restartBtn.addEventListener('click', () => initGame());
  difficultyBtn.addEventListener('click', toggleDifficulty);
  playAgainBtn.addEventListener('click', () => {
    closeModal();
    initGame();
  });
});

// START / RESTART GAME
function initGame() {
  // Clear states
  clearInterval(state.timerInterval);
  state.gameStarted = false;
  state.secondsElapsed = 0;
  state.moves = 0;
  state.pairsMatched = 0;
  state.flippedCards = [];
  state.isLockBoard = false;
  
  state.totalPairs = state.difficulty === 'easy' ? 8 : 12;
  
  // Update UI Stats
  movesEl.textContent = '0';
  timerEl.textContent = '00:00';
  pairsEl.textContent = `0/${state.totalPairs}`;
  
  // Set board difficulty class
  if (state.difficulty === 'hard') {
    boardEl.classList.add('board--hard');
  } else {
    boardEl.classList.remove('board--hard');
  }
  
  // Prepare & shuffle deck
  const selectedProfessions = PROFESSIONS.slice(0, state.totalPairs);
  const deck = [...selectedProfessions, ...selectedProfessions]; // Double to create pairs
  shuffle(deck);
  
  // Render Board
  boardEl.innerHTML = '';
  deck.forEach((profession, index) => {
    const card = createCardElement(profession, index);
    boardEl.appendChild(card);
  });
}

// TOGGLE DIFFICULTY
function toggleDifficulty() {
  state.difficulty = state.difficulty === 'easy' ? 'hard' : 'easy';
  difficultyText.textContent = state.difficulty === 'easy' ? 'Fácil' : 'Difícil';
  initGame();
}

// SHUFFLE ALGORITHM (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// CREATE CARD COMPONENT
function createCardElement(profession, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = profession.name;
  card.dataset.index = index;
  card.setAttribute('role', 'gridcell');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Carta boca abajo`);
  
  card.innerHTML = `
    <div class="card__face card__face--front">❓</div>
    <div class="card__face card__face--back">
      <span class="card__emoji">${profession.emoji}</span>
      <span class="card__name">${profession.name}</span>
    </div>
  `;
  
  // Mouse & touch events
  card.addEventListener('click', () => flipCard(card));
  
  // Keyboard access
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flipCard(card);
    }
  });
  
  return card;
}

// TIMER FUNCTIONS
function startTimer() {
  state.gameStarted = true;
  state.timerInterval = setInterval(() => {
    state.secondsElapsed++;
    timerEl.textContent = formatTime(state.secondsElapsed);
  }, 1000);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

// FLIP CARD ACTIONS
function flipCard(card) {
  if (state.isLockBoard) return;
  if (card.classList.contains('is-flipped') || card.classList.contains('is-matched')) return;
  
  // Start timer on first flip
  if (!state.gameStarted) {
    startTimer();
  }
  
  card.classList.add('is-flipped');
  state.flippedCards.push(card);
  
  if (state.flippedCards.length === 2) {
    checkMatch();
  }
}

// CHECK MATCH LOGIC
function checkMatch() {
  state.isLockBoard = true;
  state.moves++;
  movesEl.textContent = state.moves;
  
  const [card1, card2] = state.flippedCards;
  const isMatch = card1.dataset.name === card2.dataset.name;
  
  if (isMatch) {
    handleMatch(card1, card2);
  } else {
    handleMismatch(card1, card2);
  }
}

function handleMatch(card1, card2) {
  card1.classList.add('is-matched');
  card2.classList.add('is-matched');
  card1.setAttribute('aria-label', `Revelado: ${card1.dataset.name}. Encontrado.`);
  card2.setAttribute('aria-label', `Revelado: ${card2.dataset.name}. Encontrado.`);
  
  state.pairsMatched++;
  pairsEl.textContent = `${state.pairsMatched}/${state.totalPairs}`;
  
  resetTurn();
  
  // Check win condition
  if (state.pairsMatched === state.totalPairs) {
    setTimeout(showVictory, 600);
  }
}

function handleMismatch(card1, card2) {
  card1.classList.add('is-error');
  card2.classList.add('is-error');
  
  setTimeout(() => {
    card1.classList.remove('is-flipped', 'is-error');
    card2.classList.remove('is-flipped', 'is-error');
    resetTurn();
  }, 1000);
}

function resetTurn() {
  state.flippedCards = [];
  state.isLockBoard = false;
}

// VICTORY SCREEN
function showVictory() {
  clearInterval(state.timerInterval);
  
  // Stats inside modal
  finalTimeEl.textContent = formatTime(state.secondsElapsed);
  finalMovesEl.textContent = state.moves;
  
  // Calculate Stars Score
  const stars = calculateStars(state.moves, state.secondsElapsed, state.difficulty);
  finalStarsEl.textContent = stars;
  
  // Activate modal overlay
  modalOverlay.classList.add('is-active');
}

function closeModal() {
  modalOverlay.classList.remove('is-active');
}

// STAR SCORE CALCULATOR
function calculateStars(moves, seconds, difficulty) {
  const minMovesPossible = difficulty === 'easy' ? 8 : 12;
  
  // Simple thresholds
  let thresholdPerfect = minMovesPossible + (difficulty === 'easy' ? 4 : 6);
  let thresholdGood = minMovesPossible + (difficulty === 'easy' ? 10 : 15);
  
  if (moves <= thresholdPerfect && seconds <= (difficulty === 'easy' ? 45 : 75)) {
    return '⭐⭐⭐';
  } else if (moves <= thresholdGood && seconds <= (difficulty === 'easy' ? 90 : 150)) {
    return '⭐⭐';
  } else {
    return '⭐';
  }
}
