const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentElement = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

// Create all cards
function createCards() {
  cardsData.forEach((data, idx) => createCard(data, idx));
}

// Create a single card in DOM
function createCard(data, index) {
  const { question, answer } = data;
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${question}</p>
      </div>
      <div class="inner-card-back">
        <p>${answer}</p>
      </div>
    </div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  currentElement.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from localStorage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));

  return cards === null ? [] : cards;
}

// Add card to localStorage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

createCards();

// Event listeners
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add new card
addCardBtn.addEventListener('click', () => {
  const question = questionElement.value;
  const answer = answerElement.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);

    questionElement.value = '';
    answerElement.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});
