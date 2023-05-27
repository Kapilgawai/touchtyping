const words = ['asdf', 'jkl', 'fdsa', 'lkj'];
const keys = 'asdfjkl;';
let currentWordIndex = 0;
let keysTyped = 0;
let correctKeys = 0;
let startTime;
let endTime;
let timerInterval;

// Display random keys to type
function displayKeys() {
  const currentWord = words[currentWordIndex];
  const randomKey = currentWord[Math.floor(Math.random() * currentWord.length)];
  document.getElementById('keys').textContent = randomKey;
}

// Check typed key
function checkKey(e) {
  const typedKey = e.target.value;
  const nextKey = document.getElementById('keys').textContent;

  keysTyped++;

  if (typedKey === nextKey) {
    correctKeys++;
    document.getElementById('typing-box').classList.add('animate');
  } else {
    document.getElementById('typing-box').classList.remove('animate');
  }

  if (typedKey === words[currentWordIndex]) {
    currentWordIndex++;
    if (currentWordIndex === words.length) {
      showCompletionMessage();
    }
  }

  updateStats();
  e.target.value = '';

  displayKeys();
}

// Update statistics
function updateStats() {
  const accuracy = Math.round((correctKeys / keysTyped) * 100);
  const typingSpeed = calculateTypingSpeed();
  
  document.getElementById('keys-typed').textContent = `Keys Typed: ${keysTyped}`;
  document.getElementById('accuracy-percent').textContent = `${accuracy}%`;
  document.getElementById('typing-speed').textContent = `Typing Speed: ${typingSpeed} WPM`;
  document.getElementById('typing-speed-box').textContent = `Typing Speed: ${typingSpeed} WPM`;
  
  drawAccuracyGraph(accuracy);
}

// Calculate typing speed
function calculateTypingSpeed() {
  const minutesElapsed = (endTime - startTime) / 1000 / 60;
  const wordsTyped = currentWordIndex;
  const typingSpeed = Math.round(wordsTyped / minutesElapsed);
  return typingSpeed;
}

// Show completion message
function showCompletionMessage() {
  document.getElementById('completion-msg').textContent = 'Congratulations! You completed all words.';
  document.getElementById('completion-msg').style.display = 'block';
}

// Draw accuracy graph
function drawAccuracyGraph(accuracy) {
  const canvas = document.getElementById('accuracy-graph');
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 50;
  const startAngle = -Math.PI / 2;
  const endAngle = (accuracy / 100) * (Math.PI * 2) + startAngle;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 8;
  ctx.stroke();

  // Draw percentage arc
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
  ctx.strokeStyle = '#5cb85c';
  ctx.lineWidth = 8;
  ctx.stroke();
}

// Start the timer
function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const elapsedTime = currentTime - startTime;
    if (elapsedTime >= 300000) {
      endPractice();
    }
  }, 1000);
}

// End the timer and practice
function endPractice() {
  clearInterval(timerInterval);
  endTime = new Date();
  document.getElementById('input-box').blur();
}

// Initialize the application
function init() {
  displayKeys();
  document.getElementById('input-box').addEventListener('input', checkKey);
  document.getElementById('input-box').addEventListener('focus', startTimer);
  document.getElementById('input-box').addEventListener('blur', endPractice);
}

init();
