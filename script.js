/**
 * MoodMate — Gen Z Vibe Edition
 */

const MOODS = {
  bored: {
    emoji: '😐',
    label: 'Bored',
    gradient: 'linear-gradient(135deg, #0f172a, #1e293b)',
    accent: '#60a5fa',
    freq: 220,
    title: "Feeling bored? We got you",
    subtitle: "One tap before you open more tabs",
    funny: [
      "You opened Instagram for “2 mins” and accidentally completed a season of life.",
      "Your brain is loading slower than college WiFi.",
      "You’re scrolling so hard even Instagram is getting tired of you.",
      "At this point your thumb deserves a gym membership.",
      "You’re not bored… you’re just waiting for life to entertain you personally."
    ],
    memes: [
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
    gradient: 'linear-gradient(135deg, #181127, #2d1a4d)',
    accent: '#a78bfa',
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
    memes: [
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
    gradient: 'linear-gradient(135deg, #2b0b14, #4c0d1a)',
    accent: '#fb7185',
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
    memes: [
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
    gradient: 'linear-gradient(135deg, #031e11, #0a3a21)',
    accent: '#4ade80',
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
    memes: [
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
  shifts: 'moodmate_pro_metric_shifts'
};

let state = {
  currentMood: localStorage.getItem(STORAGE_KEYS.mood) || 'bored',
  history: JSON.parse(localStorage.getItem(STORAGE_KEYS.history)) || [],
  soundEnabled: localStorage.getItem(STORAGE_KEYS.sound) !== 'false',
  isLightMode: localStorage.getItem(STORAGE_KEYS.theme) === 'light',
  totalShifts: parseInt(localStorage.getItem(STORAGE_KEYS.shifts)) || 0,
  journalContent: JSON.parse(localStorage.getItem(STORAGE_KEYS.journal)) || {}
};

const contentPoolIndices = {};

const dom = {
  heroTitle:        document.getElementById('heroTitle'),
  heroSubtitle:     document.getElementById('heroSubtitle'),
  funnyInsight:     document.getElementById('funnyInsight'),
  memeCaption:      document.getElementById('memeCaption'),
  motivationText:   document.getElementById('motivationText'),
  activeMoodEmoji:  document.getElementById('activeMoodEmoji'),
  activeMoodText:   document.getElementById('activeMoodText'),
  historyContainer: document.getElementById('historyContainer'),
  randomMoodBtn:    document.getElementById('randomMoodBtn'),
  themeBtn:         document.getElementById('themeBtn'),
  soundBtn:         document.getElementById('soundBtn'),
  journalInput:     document.getElementById('journalInput'),
  saveIndicator:    document.getElementById('saveIndicator'),
  totalShiftsMetric:document.getElementById('totalShiftsMetric'),
  toastHub:         document.getElementById('toastHub'),
  moodButtons:      document.querySelectorAll('.mood-btn'),
  dashboardCards:   document.querySelectorAll('.dashboard-card'),
  copyButtons:      document.querySelectorAll('.action-pill-btn'),
  blur1:            document.getElementById('blur1'),
  blur2:            document.getElementById('blur2')
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
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {}
}

function selectUniqueContent(dataArray, keyTracker) {
  if (dataArray.length <= 1) return dataArray[0];
  let selectionIndex;
  do {
    selectionIndex = Math.floor(Math.random() * dataArray.length);
  } while (selectionIndex === contentPoolIndices[keyTracker]);
  contentPoolIndices[keyTracker] = selectionIndex;
  return dataArray[selectionIndex];
}

function pushSystemNotification(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notice';
  toast.innerHTML = `<span>⚙️</span> <span>${message}</span>`;
  dom.toastHub.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function restartCardAnimations() {
  dom.dashboardCards.forEach(card => {
    card.style.animation = 'none';
    void card.offsetHeight;
    card.style.animation = '';
  });
}

function renderHistoryPills() {
  const blueprintFragment = document.createDocumentFragment();
  state.history.forEach(key => {
    if (!MOODS[key]) return;
    const pill = document.createElement('div');
    pill.className = 'history-pill';
    pill.textContent = `${MOODS[key].emoji} ${MOODS[key].label}`;
    pill.style.cursor = 'pointer';
    pill.addEventListener('click', () => switchActiveWorkspace(key));
    blueprintFragment.appendChild(pill);
  });
  dom.historyContainer.replaceChildren(blueprintFragment);
}

function updateMetricCounters(isNewShift = false) {
  if (isNewShift) {
    state.totalShifts += 1;
    localStorage.setItem(STORAGE_KEYS.shifts, state.totalShifts);
  }
  dom.totalShiftsMetric.textContent = state.totalShifts;
}

function switchActiveWorkspace(moodKey, triggerMetrics = true) {
  const config = MOODS[moodKey];
  if (!config) return;

  state.currentMood = moodKey;
  localStorage.setItem(STORAGE_KEYS.mood, moodKey);

  triggerSynthAudio(config.freq);

  document.documentElement.style.setProperty('--bg-gradient', config.gradient);
  document.documentElement.style.setProperty('--accent', config.accent);
  const RGBParsed = moodKey === 'bored' ? '59, 130, 246' : moodKey === 'lazy' ? '167, 139, 250' : moodKey === 'stressed' ? '251, 113, 133' : '74, 222, 128';
  document.documentElement.style.setProperty('--accent-rgb', RGBParsed);
  document.body.style.background = config.gradient;

  dom.blur1.style.transform = `translate(${Math.random() * 20 - 10}%, ${Math.random() * 20 - 10}%) scale(${1 + Math.random() * 0.2})`;
  dom.blur2.style.transform = `translate(${Math.random() * 20 - 10}%, ${Math.random() * 20 - 10}%) scale(${1 + Math.random() * 0.2})`;

  dom.heroTitle.textContent = config.title;
  dom.heroSubtitle.textContent = config.subtitle;

  dom.funnyInsight.textContent = selectUniqueContent(config.funny, `${moodKey}_funny`);
  dom.memeCaption.textContent = selectUniqueContent(config.memes, `${moodKey}_meme`);
  dom.motivationText.textContent = selectUniqueContent(config.motivation, `${moodKey}_motivation`);

  dom.activeMoodEmoji.textContent = config.emoji;
  dom.activeMoodText.textContent = config.label;

  dom.moodButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mood === moodKey);
  });

  state.history = [moodKey, ...state.history.filter(item => item !== moodKey)].slice(0, 6);
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(state.history));

  dom.journalInput.value = state.journalContent[moodKey] || '';

  renderHistoryPills();
  updateMetricCounters(triggerMetrics);
  restartCardAnimations();
}

dom.moodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.mood === state.currentMood) return;
    switchActiveWorkspace(btn.dataset.mood, true);
  });
});

dom.randomMoodBtn.addEventListener('click', () => {
  const filterKeys = Object.keys(MOODS).filter(key => key !== state.currentMood);
  const designatedTarget = filterKeys[Math.floor(Math.random() * filterKeys.length)];
  switchActiveWorkspace(designatedTarget, true);
});

dom.copyButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const targetingID = btn.dataset.copy;
    const targetsText = document.getElementById(targetingID).textContent;
    navigator.clipboard.writeText(targetsText).then(() => {
      pushSystemNotification('Text copied!');
      const originalLabel = btn.textContent;
      btn.textContent = '✅ Copied';
      btn.style.background = '#10b981';
      setTimeout(() => {
        btn.textContent = originalLabel;
        btn.style.background = '';
      }, 1500);
    });
  });
});

let journalAutoSaveTimeout;
dom.journalInput.addEventListener('input', () => {
  dom.saveIndicator.textContent = 'Saving...';
  dom.saveIndicator.className = 'save-status-indicator typing';
  clearTimeout(journalAutoSaveTimeout);
  journalAutoSaveTimeout = setTimeout(() => {
    state.journalContent[state.currentMood] = dom.journalInput.value;
    localStorage.setItem(STORAGE_KEYS.journal, JSON.stringify(state.journalContent));
    dom.saveIndicator.textContent = 'Saved';
    dom.saveIndicator.className = 'save-status-indicator active';
    setTimeout(() => {
      dom.saveIndicator.className = 'save-status-indicator';
    }, 2000);
  }, 800);
});

dom.themeBtn.addEventListener('click', () => {
  state.isLightMode = !state.isLightMode;
  document.body.classList.toggle('light-mode', state.isLightMode);
  localStorage.setItem(STORAGE_KEYS.theme, state.isLightMode ? 'light' : 'dark');
  dom.themeBtn.textContent = state.isLightMode ? '☀️' : '🌙';
  pushSystemNotification(`Theme changed`);
});

dom.soundBtn.addEventListener('click', () => {
  state.soundEnabled = !state.soundEnabled;
  localStorage.setItem(STORAGE_KEYS.sound, state.soundEnabled);
  dom.soundBtn.textContent = state.soundEnabled ? '🔊' : '🔇';
  pushSystemNotification(`Sound turned ${state.soundEnabled ? 'ON' : 'OFF'}`);
  if (state.soundEnabled) triggerSynthAudio(350);
});

(function bootstrapSystem() {
  if (state.isLightMode) {
    document.body.classList.add('light-mode');
    dom.themeBtn.textContent = '☀️';
  } else {
    dom.themeBtn.textContent = '🌙';
  }
  dom.soundBtn.textContent = state.soundEnabled ? '🔊' : '🔇';
  updateMetricCounters(false);
  switchActiveWorkspace(state.currentMood, false);
})();