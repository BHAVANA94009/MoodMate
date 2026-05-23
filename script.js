/**
 * MoodMate — Gen Z Vibe Edition with Manual Control
 */

const MOODS = {
  bored: {
    emoji: '😐',
    label: 'Bored',
    gradient: 'linear-gradient(135deg, #0d0221, #1a0b2e, #2d1b4e)',
    accent: '#00f5ff',
    freq: 220,
    title: "Feeling bored? We got you",
    subtitle: "Pick your vibe below",
    funny: [
      "You opened Instagram for “2 mins” and accidentally completed a season of life.",
      "Your brain is loading slower than college WiFi.",
      "You’re scrolling so hard even Instagram is getting tired of you.",
      "At this point your thumb deserves a gym membership.",
      "You’re not bored… you’re just waiting for life to entertain you personally."
    ],
    meme: [
      "“Me switching between 5 apps like new content will magically appear.”",
      "“Opened YouTube for one video. Sun is rising now.”",
      "“Me: there’s nothing to do. Also me: ignores 27 unfinished things.”",
      "“My screen time report fighting for its life every Sunday.”",
      "“Brain: let’s be productive. Me: funniest joke ever.”"
    ],
    motivation: [
      "“You can memorize 200 reel audios but not finish one small task 😭.”",
      "“You keep watching creators become successful while sitting in comment section mode.”",
      "“At this point you’re investing more time into strangers’ lives than your own.”",
      "“If scrolling paid salary, you’d already be rich.”",
      "“Close Instagram for 10 mins and suddenly your life might start updating too.”"
    ]
  },

  lazy: {
    emoji: '😴',
    label: 'Lazy',
    gradient: 'linear-gradient(135deg, #1a0b2e, #2d0b3d, #4a154b)',
    accent: '#ff00ff',
    freq: 293.66,
    title: "Lazy day is okay today",
    subtitle: "Your bed is winning right now",
    funny: [
      "Your bed has emotional attachment issues with you.",
      "You’re moving like your body is downloading updates in background.",
      "“I’ll do it later” should honestly be printed on your T-shirt.",
      "Even your charger works harder than you.",
      "Your productivity is currently in airplane mode."
    ],
    meme: [
      "“Me preparing mentally for work instead of actually doing it.”",
      "“Task: takes 10 mins. Me avoiding it for 3 business days.”",
      "“My daily workout is changing sleeping positions.”",
      "“Me after doing one task: yeah I deserve rest now.”",
      "“Bed: don’t leave me. Me: never.”"
    ],
    motivation: [
      "“You watched 48 productivity reels today… congrats, still no productivity 😭.”",
      "“You support creators by watching them daily but refuse to support your own future.”",
      "“At this rate your dreams are also waiting in buffering mode.”",
      "“Scrolling feels relaxing until reality hits at night.”",
      "“Even starting badly is better than watching others win from your bed.”"
    ]
  },

  stressed: {
    emoji: '😵',
    label: 'Stressed',
    gradient: 'linear-gradient(135deg, #2d0b0b, #4a0e1e, #6b1028)',
    accent: '#ff2e63',
    freq: 440,
    title: "Your brain feels too full",
    subtitle: "Take a breath",
    funny: [
      "Your brain opened too many tabs and now none are responding.",
      "You’re overthinking like your thoughts are sponsored content.",
      "Calm down… the situation isn’t even as dramatic as your imagination made it.",
      "You’re mentally fighting battles that don’t even exist yet.",
      "Your anxiety is creating fan fiction at this point."
    ],
    meme: [
      "“Me remembering one embarrassing moment from 2017 at 2 AM.”",
      "“Brain: let’s overthink this completely normal conversation.”",
      "“Stress level: typing password wrong with full confidence.”",
      "“Me making fake scenarios and getting upset about them.”",
      "“My brain during exams: error 404 intelligence not found.”"
    ],
    motivation: [
      "“You replay one text message more times than your favorite song 😭.”",
      "“Most of your stress exists only in imagination premium version.”",
      "“You’re exhausting yourself solving problems that haven’t even unlocked yet.”",
      "“One real action reduces more stress than 100 fake scenarios.”",
      "“Your mind acts like every small issue is Avengers Endgame.”"
    ]
  },

  energetic: {
    emoji: '⚡',
    label: 'Energetic',
    gradient: 'linear-gradient(135deg, #0b2d1b, #0e4a2e, #10b981)',
    accent: '#00ff88',
    freq: 587.33,
    title: "You have strong energy now",
    subtitle: "Let us go",
    funny: [
      "You drank one coffee and suddenly think you can change the world overnight.",
      "Calm down Elon Musk, first finish your pending tasks.",
      "Your motivation is high but your consistency is on leave.",
      "You start projects like Netflix starts new shows — endlessly.",
      "Right now you have CEO confidence with intern execution."
    ],
    meme: [
      "“Me at 1 AM planning my millionaire routine.”",
      "“Started learning 6 skills. Mastered none.”",
      "“Me after watching one motivational reel: time to fix my entire life.”",
      "“Energy level: gym edit background music.”",
      "“My ideas are billion-dollar. My execution is trial version.”"
    ],
    motivation: [
      "“Watching startup reels won’t make you a founder 😭.”",
      "“You save motivational posts like they automatically change your life.”",
      "“Your ideas are useless until you survive the boring execution part.”",
      "“Planning 20 things is easy. Finishing 1 is rare.”",
      "“Use your energy before it turns into another unfinished phase.”"
    ]
  }
};

const STORAGE_KEYS = {
  mood: 'moodmate_pro_current_mood',
  history: 'moodmate_pro_history_array',
  sound: 'moodmate_pro_sound_toggle',
  theme: 'moodmate_pro_theme_matrix',
  journal: 'moodmate_pro_journal_cache',
  shifts: 'moodmate_pro_metric_shifts',
  streak: 'moodmate_pro_streak',
  lastDate: 'moodmate_pro_last_date'
};

let state = {
  currentMood: localStorage.getItem(STORAGE_KEYS.mood) || 'bored',
  history: JSON.parse(localStorage.getItem(STORAGE_KEYS.history)) || [],
  soundEnabled: localStorage.getItem(STORAGE_KEYS.sound)!== 'false',
  isLightMode: localStorage.getItem(STORAGE_KEYS.theme) === 'light',
  totalShifts: parseInt(localStorage.getItem(STORAGE_KEYS.shifts)) || 0,
  journalContent: JSON.parse(localStorage.getItem(STORAGE_KEYS.journal)) || {},
  streak: parseInt(localStorage.getItem(STORAGE_KEYS.streak)) || 0,
  lastDate: localStorage.getItem(STORAGE_KEYS.lastDate) || ''
};

const contentPoolIndices = {};

const dom = {
  heroTitle: document.getElementById('heroTitle'),
  heroSubtitle: document.getElementById('heroSubtitle'),
  activeMoodEmoji: document.getElementById('activeMoodEmoji'),
  activeMoodText: document.getElementById('activeMoodText'),
  historyContainer: document.getElementById('historyContainer'),
  randomMoodBtn: document.getElementById('randomMoodBtn'),
  themeBtn: document.getElementById('themeBtn'),
  soundBtn: document.getElementById('soundBtn'),
  journalInput: document.getElementById('journalInput'),
  saveIndicator: document.getElementById('saveIndicator'),
  totalShiftsMetric: document.getElementById('totalShiftsMetric'),
  activeStreakMetric: document.getElementById('activeStreakMetric'),
  toastHub: document.getElementById('toastHub'),
  moodButtons: document.querySelectorAll('.mood-btn'),
  blur1: document.getElementById('blur1'),
  blur2: document.getElementById('blur2'),
  actionButtonsSection: document.getElementById('actionButtonsSection'),
  contentButtons: document.querySelectorAll('.content-btn'),
  resultCard: document.getElementById('resultCard'),
  resultIcon: document.getElementById('resultIcon'),
  resultTitle: document.getElementById('resultTitle'),
  resultText: document.getElementById('resultText'),
  copyResultBtn: document.getElementById('copyResultBtn')
};

function triggerSynthAudio(frequency) {
  if (!state.soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) { console.error("Audio error:", e); }
}

function renderToast(message, emoji = '✨') {
  const toast = document.createElement('div');
  toast.className = 'toast-notice';
  toast.innerHTML = `<span>${emoji}</span> ${message}`;
  dom.toastHub.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function updateStreak() {
  const today = new Date().toDateString();
  if (state.lastDate!== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (state.lastDate === yesterday.toDateString()) {
      state.streak++;
    } else {
      state.streak = 1;
    }
    state.lastDate = today;
    localStorage.setItem(STORAGE_KEYS.streak, state.streak);
    localStorage.setItem(STORAGE_KEYS.lastDate, state.lastDate);
  }
  dom.activeStreakMetric.textContent = `${state.streak}d`;
}

function updateThemeColors() {
  const mood = MOODS[state.currentMood];
  document.body.style.setProperty('--bg-gradient', mood.gradient);
  document.body.style.setProperty('--accent', mood.accent);
  document.body.style.setProperty('--accent-rgb', hexToRgb(mood.accent));
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 245, 255';
}

function updateMoodUI(moodKey, isInitial = false) {
  const mood = MOODS[moodKey];
  if (!mood) return;
  
  if (!isInitial) {
    state.totalShifts++;
    localStorage.setItem(STORAGE_KEYS.shifts, state.totalShifts);
    dom.totalShiftsMetric.textContent = state.totalShifts;
  }
  
  dom.heroTitle.textContent = mood.title;
  dom.heroSubtitle.textContent = mood.subtitle;
  dom.activeMoodEmoji.textContent = mood.emoji;
  dom.activeMoodText.textContent = mood.label;
  
  updateThemeColors();
  
  dom.moodButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mood === moodKey);
  });
  
  dom.actionButtonsSection.classList.remove('hidden');
  dom.resultCard.classList.add('hidden');
  
  if (!isInitial) {
    triggerSynthAudio(mood.freq);
    renderToast(`${mood.label} vibe activated`, mood.emoji);
  }
}

function updateHistoryUI() {
  dom.historyContainer.innerHTML = '';
  state.history.slice(0, 4).forEach(item => {
    const pill = document.createElement('div');
    pill.className = 'history-pill';
    pill.textContent = `${item.emoji} ${item.label}`;
    dom.historyContainer.appendChild(pill);
  });
}

function addToHistory(moodKey) {
  const mood = MOODS[moodKey];
  const historyItem = { mood: moodKey, emoji: mood.emoji, label: mood.label };
  state.history.unshift(historyItem);
  state.history = state.history.slice(0, 4);
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(state.history));
  updateHistoryUI();
}

function getNextContent(moodKey, type) {
  const pool = MOODS[moodKey][type];
  if (!contentPoolIndices[moodKey]) contentPoolIndices[moodKey] = {};
  if (contentPoolIndices[moodKey][type] === undefined) contentPoolIndices[moodKey][type] = 0;
  const index = contentPoolIndices[moodKey][type] % pool.length;
  contentPoolIndices[moodKey][type]++;
  return pool[index];
}

function displayContent(type) {
  const content = getNextContent(state.currentMood, type);
  const icons = { funny: '😂', meme: '💀', motivation: '⚡' };
  const titles = { funny: 'Funny', meme: 'Meme', motivation: 'Motivation' };
  
  dom.resultIcon.textContent = icons[type];
  dom.resultTitle.textContent = titles[type];
  dom.resultText.textContent = content;
  dom.resultCard.classList.remove('hidden');
  dom.resultCard.classList.remove('stagger-card');
  void dom.resultCard.offsetWidth;
  dom.resultCard.classList.add('stagger-card');
}

function handleMoodChange(moodKey) {
  if (moodKey === state.currentMood) return;
  state.currentMood = moodKey;
  localStorage.setItem(STORAGE_KEYS.mood, moodKey);
  updateMoodUI(moodKey);
  addToHistory(moodKey);
}

function handleRandomMood() {
  const moodKeys = Object.keys(MOODS);
  const randomKey = moodKeys[Math.floor(Math.random() * moodKeys.length)];
  handleMoodChange(randomKey);
  renderToast('Random vibe dropped', '🎲');
}

function copyResult() {
  navigator.clipboard.writeText(dom.resultText.textContent).then(() => {
    renderToast('Copied fr', '📋');
  });
}

let journalTimer;
function handleJournalInput() {
  dom.saveIndicator.textContent = 'Typing...';
  dom.saveIndicator.classList.add('typing');
  dom.saveIndicator.classList.remove('active');
  clearTimeout(journalTimer);
  journalTimer = setTimeout(() => {
    state.journalContent[state.currentMood] = dom.journalInput.value;
    localStorage.setItem(STORAGE_KEYS.journal, JSON.stringify(state.journalContent));
    dom.saveIndicator.textContent = 'Saved fr';
    dom.saveIndicator.classList.remove('typing');
    dom.saveIndicator.classList.add('active');
  }, 800);
}

function loadJournalForMood() {
  dom.journalInput.value = state.journalContent[state.currentMood] || '';
  dom.saveIndicator.classList.remove('active', 'typing');
}

function toggleTheme() {
  state.isLightMode =!state.isLightMode;
  document.body.classList.toggle('light-mode', state.isLightMode);
  dom.themeBtn.textContent = state.isLightMode? '☀️' : '🌙';
  localStorage.setItem(STORAGE_KEYS.theme, state.isLightMode? 'light' : 'dark');
  renderToast(`${state.isLightMode? 'Light' : 'Dark'} mode on`, state.isLightMode? '☀️' : '🌙');
}

function toggleSound() {
  state.soundEnabled =!state.soundEnabled;
  dom.soundBtn.textContent = state.soundEnabled? '🔊' : '🔇';
  localStorage.setItem(STORAGE_KEYS.sound, state.soundEnabled);
  if (state.soundEnabled) triggerSynthAudio(440);
  renderToast(`Sound ${state.soundEnabled? 'on' : 'off'}`, state.soundEnabled? '🔊' : '🔇');
}

function initializeApp() {
  document.body.classList.toggle('light-mode', state.isLightMode);
  dom.themeBtn.textContent = state.isLightMode? '☀️' : '🌙';
  dom.soundBtn.textContent = state.soundEnabled? '🔊' : '🔇';
  dom.totalShiftsMetric.textContent = state.totalShifts;
  updateStreak();
  updateMoodUI(state.currentMood, true);
  updateHistoryUI();
  loadJournalForMood();
  
  dom.moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      handleMoodChange(btn.dataset.mood);
      loadJournalForMood();
    });
  });
  
  dom.contentButtons.forEach(btn => {
    btn.addEventListener('click', () => displayContent(btn.dataset.type));
  });
  
  dom.randomMoodBtn.addEventListener('click', handleRandomMood);
  dom.copyResultBtn.addEventListener('click', copyResult);
  dom.journalInput.addEventListener('input', handleJournalInput);
  dom.themeBtn.addEventListener('click', toggleTheme);
  dom.soundBtn.addEventListener('click', toggleSound);
}

document.addEventListener('DOMContentLoaded', initializeApp);/**
 * MoodMate — Gen Z Vibe Edition with Manual Control
 */

const MOODS = {
  bored: {
    emoji: '😐',
    label: 'Bored',
    gradient: 'linear-gradient(135deg, #0d0221, #1a0b2e, #2d1b4e)',
    accent: '#00f5ff',
    freq: 220,
    title: "Feeling bored? We got you",
    subtitle: "Pick your vibe below",
    funny: [
      "You opened Instagram for “2 mins” and accidentally completed a season of life.",
      "Your brain is loading slower than college WiFi.",
      "You’re scrolling so hard even Instagram is getting tired of you.",
      "At this point your thumb deserves a gym membership.",
      "You’re not bored… you’re just waiting for life to entertain you personally."
    ],
    meme: [
      "“Me switching between 5 apps like new content will magically appear.”",
      "“Opened YouTube for one video. Sun is rising now.”",
      "“Me: there’s nothing to do. Also me: ignores 27 unfinished things.”",
      "“My screen time report fighting for its life every Sunday.”",
      "“Brain: let’s be productive. Me: funniest joke ever.”"
    ],
    motivation: [
      "“You can memorize 200 reel audios but not finish one small task 😭.”",
      "“You keep watching creators become successful while sitting in comment section mode.”",
      "“At this point you’re investing more time into strangers’ lives than your own.”",
      "“If scrolling paid salary, you’d already be rich.”",
      "“Close Instagram for 10 mins and suddenly your life might start updating too.”"
    ]
  },

  lazy: {
    emoji: '😴',
    label: 'Lazy',
    gradient: 'linear-gradient(135deg, #1a0b2e, #2d0b3d, #4a154b)',
    accent: '#ff00ff',
    freq: 293.66,
    title: "Lazy day is okay today",
    subtitle: "Your bed is winning right now",
    funny: [
      "Your bed has emotional attachment issues with you.",
      "You’re moving like your body is downloading updates in background.",
      "“I’ll do it later” should honestly be printed on your T-shirt.",
      "Even your charger works harder than you.",
      "Your productivity is currently in airplane mode."
    ],
    meme: [
      "“Me preparing mentally for work instead of actually doing it.”",
      "“Task: takes 10 mins. Me avoiding it for 3 business days.”",
      "“My daily workout is changing sleeping positions.”",
      "“Me after doing one task: yeah I deserve rest now.”",
      "“Bed: don’t leave me. Me: never.”"
    ],
    motivation: [
      "“You watched 48 productivity reels today… congrats, still no productivity 😭.”",
      "“You support creators by watching them daily but refuse to support your own future.”",
      "“At this rate your dreams are also waiting in buffering mode.”",
      "“Scrolling feels relaxing until reality hits at night.”",
      "“Even starting badly is better than watching others win from your bed.”"
    ]
  },

  stressed: {
    emoji: '😵',
    label: 'Stressed',
    gradient: 'linear-gradient(135deg, #2d0b0b, #4a0e1e, #6b1028)',
    accent: '#ff2e63',
    freq: 440,
    title: "Your brain feels too full",
    subtitle: "Take a breath",
    funny: [
      "Your brain opened too many tabs and now none are responding.",
      "You’re overthinking like your thoughts are sponsored content.",
      "Calm down… the situation isn’t even as dramatic as your imagination made it.",
      "You’re mentally fighting battles that don’t even exist yet.",
      "Your anxiety is creating fan fiction at this point."
    ],
    meme: [
      "“Me remembering one embarrassing moment from 2017 at 2 AM.”",
      "“Brain: let’s overthink this completely normal conversation.”",
      "“Stress level: typing password wrong with full confidence.”",
      "“Me making fake scenarios and getting upset about them.”",
      "“My brain during exams: error 404 intelligence not found.”"
    ],
    motivation: [
      "“You replay one text message more times than your favorite song 😭.”",
      "“Most of your stress exists only in imagination premium version.”",
      "“You’re exhausting yourself solving problems that haven’t even unlocked yet.”",
      "“One real action reduces more stress than 100 fake scenarios.”",
      "“Your mind acts like every small issue is Avengers Endgame.”"
    ]
  },

  energetic: {
    emoji: '⚡',
    label: 'Energetic',
    gradient: 'linear-gradient(135deg, #0b2d1b, #0e4a2e, #10b981)',
    accent: '#00ff88',
    freq: 587.33,
    title: "You have strong energy now",
    subtitle: "Let us go",
    funny: [
      "You drank one coffee and suddenly think you can change the world overnight.",
      "Calm down Elon Musk, first finish your pending tasks.",
      "Your motivation is high but your consistency is on leave.",
      "You start projects like Netflix starts new shows — endlessly.",
      "Right now you have CEO confidence with intern execution."
    ],
    meme: [
      "“Me at 1 AM planning my millionaire routine.”",
      "“Started learning 6 skills. Mastered none.”",
      "“Me after watching one motivational reel: time to fix my entire life.”",
      "“Energy level: gym edit background music.”",
      "“My ideas are billion-dollar. My execution is trial version.”"
    ],
    motivation: [
      "“Watching startup reels won’t make you a founder 😭.”",
      "“You save motivational posts like they automatically change your life.”",
      "“Your ideas are useless until you survive the boring execution part.”",
      "“Planning 20 things is easy. Finishing 1 is rare.”",
      "“Use your energy before it turns into another unfinished phase.”"
    ]
  }
};

const STORAGE_KEYS = {
  mood: 'moodmate_pro_current_mood',
  history: 'moodmate_pro_history_array',
  sound: 'moodmate_pro_sound_toggle',
  theme: 'moodmate_pro_theme_matrix',
  journal: 'moodmate_pro_journal_cache',
  shifts: 'moodmate_pro_metric_shifts',
  streak: 'moodmate_pro_streak',
  lastDate: 'moodmate_pro_last_date'
};

let state = {
  currentMood: localStorage.getItem(STORAGE_KEYS.mood) || 'bored',
  history: JSON.parse(localStorage.getItem(STORAGE_KEYS.history)) || [],
  soundEnabled: localStorage.getItem(STORAGE_KEYS.sound)!== 'false',
  isLightMode: localStorage.getItem(STORAGE_KEYS.theme) === 'light',
  totalShifts: parseInt(localStorage.getItem(STORAGE_KEYS.shifts)) || 0,
  journalContent: JSON.parse(localStorage.getItem(STORAGE_KEYS.journal)) || {},
  streak: parseInt(localStorage.getItem(STORAGE_KEYS.streak)) || 0,
  lastDate: localStorage.getItem(STORAGE_KEYS.lastDate) || ''
};

const contentPoolIndices = {};

const dom = {
  heroTitle: document.getElementById('heroTitle'),
  heroSubtitle: document.getElementById('heroSubtitle'),
  activeMoodEmoji: document.getElementById('activeMoodEmoji'),
  activeMoodText: document.getElementById('activeMoodText'),
  historyContainer: document.getElementById('historyContainer'),
  randomMoodBtn: document.getElementById('randomMoodBtn'),
  themeBtn: document.getElementById('themeBtn'),
  soundBtn: document.getElementById('soundBtn'),
  journalInput: document.getElementById('journalInput'),
  saveIndicator: document.getElementById('saveIndicator'),
  totalShiftsMetric: document.getElementById('totalShiftsMetric'),
  activeStreakMetric: document.getElementById('activeStreakMetric'),
  toastHub: document.getElementById('toastHub'),
  moodButtons: document.querySelectorAll('.mood-btn'),
  blur1: document.getElementById('blur1'),
  blur2: document.getElementById('blur2'),
  actionButtonsSection: document.getElementById('actionButtonsSection'),
  contentButtons: document.querySelectorAll('.content-btn'),
  resultCard: document.getElementById('resultCard'),
  resultIcon: document.getElementById('resultIcon'),
  resultTitle: document.getElementById('resultTitle'),
  resultText: document.getElementById('resultText'),
  copyResultBtn: document.getElementById('copyResultBtn')
};

function triggerSynthAudio(frequency) {
  if (!state.soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) { console.error("Audio error:", e); }
}

function renderToast(message, emoji = '✨') {
  const toast = document.createElement('div');
  toast.className = 'toast-notice';
  toast.innerHTML = `<span>${emoji}</span> ${message}`;
  dom.toastHub.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function updateStreak() {
  const today = new Date().toDateString();
  if (state.lastDate!== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (state.lastDate === yesterday.toDateString()) {
      state.streak++;
    } else {
      state.streak = 1;
    }
    state.lastDate = today;
    localStorage.setItem(STORAGE_KEYS.streak, state.streak);
    localStorage.setItem(STORAGE_KEYS.lastDate, state.lastDate);
  }
  dom.activeStreakMetric.textContent = `${state.streak}d`;
}

function updateThemeColors() {
  const mood = MOODS[state.currentMood];
  document.body.style.setProperty('--bg-gradient', mood.gradient);
  document.body.style.setProperty('--accent', mood.accent);
  document.body.style.setProperty('--accent-rgb', hexToRgb(mood.accent));
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 245, 255';
}

function updateMoodUI(moodKey, isInitial = false) {
  const mood = MOODS[moodKey];
  if (!mood) return;
  
  if (!isInitial) {
    state.totalShifts++;
    localStorage.setItem(STORAGE_KEYS.shifts, state.totalShifts);
    dom.totalShiftsMetric.textContent = state.totalShifts;
  }
  
  dom.heroTitle.textContent = mood.title;
  dom.heroSubtitle.textContent = mood.subtitle;
  dom.activeMoodEmoji.textContent = mood.emoji;
  dom.activeMoodText.textContent = mood.label;
  
  updateThemeColors();
  
  dom.moodButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mood === moodKey);
  });
  
  dom.actionButtonsSection.classList.remove('hidden');
  dom.resultCard.classList.add('hidden');
  
  if (!isInitial) {
    triggerSynthAudio(mood.freq);
    renderToast(`${mood.label} vibe activated`, mood.emoji);
  }
}

function updateHistoryUI() {
  dom.historyContainer.innerHTML = '';
  state.history.slice(0, 4).forEach(item => {
    const pill = document.createElement('div');
    pill.className = 'history-pill';
    pill.textContent = `${item.emoji} ${item.label}`;
    dom.historyContainer.appendChild(pill);
  });
}

function addToHistory(moodKey) {
  const mood = MOODS[moodKey];
  const historyItem = { mood: moodKey, emoji: mood.emoji, label: mood.label };
  state.history.unshift(historyItem);
  state.history = state.history.slice(0, 4);
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(state.history));
  updateHistoryUI();
}

function getNextContent(moodKey, type) {
  const pool = MOODS[moodKey][type];
  if (!contentPoolIndices[moodKey]) contentPoolIndices[moodKey] = {};
  if (contentPoolIndices[moodKey][type] === undefined) contentPoolIndices[moodKey][type] = 0;
  const index = contentPoolIndices[moodKey][type] % pool.length;
  contentPoolIndices[moodKey][type]++;
  return pool[index];
}

function displayContent(type) {
  const content = getNextContent(state.currentMood, type);
  const icons = { funny: '😂', meme: '💀', motivation: '⚡' };
  const titles = { funny: 'Funny', meme: 'Meme', motivation: 'Motivation' };
  
  dom.resultIcon.textContent = icons[type];
  dom.resultTitle.textContent = titles[type];
  dom.resultText.textContent = content;
  dom.resultCard.classList.remove('hidden');
  dom.resultCard.classList.remove('stagger-card');
  void dom.resultCard.offsetWidth;
  dom.resultCard.classList.add('stagger-card');
}

function handleMoodChange(moodKey) {
  if (moodKey === state.currentMood) return;
  state.currentMood = moodKey;
  localStorage.setItem(STORAGE_KEYS.mood, moodKey);
  updateMoodUI(moodKey);
  addToHistory(moodKey);
}

function handleRandomMood() {
  const moodKeys = Object.keys(MOODS);
  const randomKey = moodKeys[Math.floor(Math.random() * moodKeys.length)];
  handleMoodChange(randomKey);
  renderToast('Random vibe dropped', '🎲');
}

function copyResult() {
  navigator.clipboard.writeText(dom.resultText.textContent).then(() => {
    renderToast('Copied fr', '📋');
  });
}

let journalTimer;
function handleJournalInput() {
  dom.saveIndicator.textContent = 'Typing...';
  dom.saveIndicator.classList.add('typing');
  dom.saveIndicator.classList.remove('active');
  clearTimeout(journalTimer);
  journalTimer = setTimeout(() => {
    state.journalContent[state.currentMood] = dom.journalInput.value;
    localStorage.setItem(STORAGE_KEYS.journal, JSON.stringify(state.journalContent));
    dom.saveIndicator.textContent = 'Saved fr';
    dom.saveIndicator.classList.remove('typing');
    dom.saveIndicator.classList.add('active');
  }, 800);
}

function loadJournalForMood() {
  dom.journalInput.value = state.journalContent[state.currentMood] || '';
  dom.saveIndicator.classList.remove('active', 'typing');
}

function toggleTheme() {
  state.isLightMode =!state.isLightMode;
  document.body.classList.toggle('light-mode', state.isLightMode);
  dom.themeBtn.textContent = state.isLightMode? '☀️' : '🌙';
  localStorage.setItem(STORAGE_KEYS.theme, state.isLightMode? 'light' : 'dark');
  renderToast(`${state.isLightMode? 'Light' : 'Dark'} mode on`, state.isLightMode? '☀️' : '🌙');
}

function toggleSound() {
  state.soundEnabled =!state.soundEnabled;
  dom.soundBtn.textContent = state.soundEnabled? '🔊' : '🔇';
  localStorage.setItem(STORAGE_KEYS.sound, state.soundEnabled);
  if (state.soundEnabled) triggerSynthAudio(440);
  renderToast(`Sound ${state.soundEnabled? 'on' : 'off'}`, state.soundEnabled? '🔊' : '🔇');
}

function initializeApp() {
  document.body.classList.toggle('light-mode', state.isLightMode);
  dom.themeBtn.textContent = state.isLightMode? '☀️' : '🌙';
  dom.soundBtn.textContent = state.soundEnabled? '🔊' : '🔇';
  dom.totalShiftsMetric.textContent = state.totalShifts;
  updateStreak();
  updateMoodUI(state.currentMood, true);
  updateHistoryUI();
  loadJournalForMood();
  
  dom.moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      handleMoodChange(btn.dataset.mood);
      loadJournalForMood();
    });
  });
  
  dom.contentButtons.forEach(btn => {
    btn.addEventListener('click', () => displayContent(btn.dataset.type));
  });
  
  dom.randomMoodBtn.addEventListener('click', handleRandomMood);
  dom.copyResultBtn.addEventListener('click', copyResult);
  dom.journalInput.addEventListener('input', handleJournalInput);
  dom.themeBtn.addEventListener('click', toggleTheme);
  dom.soundBtn.addEventListener('click', toggleSound);
}

document.addEventListener('DOMContentLoaded', initializeApp);