"use strict";

const MOOD_THEME_ENGINES = {
  bored:     { primary: "#a855f7", secondary: "#22d3ee", tertiary: "#ec4899", glow: "rgba(168, 85, 247, 0.35)" },
  lazy:      { primary: "#6366f1", secondary: "#a855f7", tertiary: "#22d3ee", glow: "rgba(99, 102, 241, 0.35)" },
  stressed:  { primary: "#ec4899", secondary: "#a855f7", tertiary: "#22d3ee", glow: "rgba(236, 72, 153, 0.35)" },
  energetic: { primary: "#22d3ee", secondary: "#a855f7", tertiary: "#ec4899", glow: "rgba(34, 211, 238, 0.40)" }
};

const MOOD_CONTENT = {
  bored: {
    funny: "You opened Instagram for 2 minutes and somehow forgot what year this is.",
    meme: "Current mission: switching between YouTube, Reels, and WhatsApp like a full-time job.",
    motivation: "Do one small thing right now. Even 5 minutes of effort can break boredom."
  },
  lazy: {
    funny: "Your bed and blanket are currently in a stronger relationship with you than your goals are.",
    meme: "You planned a productive day but your body selected airplane mode.",
    motivation: "Start slow. Small progress still counts as progress."
  },
  stressed: {
    funny: "Your brain created 47 fake future problems before breakfast.",
    meme: "Overthinking level: replying to a simple text after analyzing it for 20 minutes.",
    motivation: "Focus only on the next small step. Not the entire future."
  },
  energetic: {
    funny: "You suddenly feel capable of fixing your whole life in one night.",
    meme: "Energy level: opening 12 tabs and calling it productivity.",
    motivation: "Use this energy on something meaningful before it disappears."
  }
};

const CONTEXTUAL_ACTION_DECKS = {
  bored: [
    { text: "Initiate 5-Min Code Sprint Architecture", xp: 40, icon: "💻" },
    { text: "Trigger Random Structural Knowledge Drop", xp: 20, icon: "📚" }
  ],
  lazy: [
    { text: "Perform Physical Stand & Stretch Calibration", xp: 30, icon: "🧘" },
    { text: "Commit Exactly 3 Lines of Functional Logic", xp: 50, icon: "🚀" }
  ],
  stressed: [
    { text: "Execute Bio-Respiratory Sync Phase", xp: 60, icon: "🫁" },
    { text: "Purge Open Thought Logs to Plaintext", xp: 35, icon: "📝" }
  ],
  energetic: [
    { text: "Lock-In High Priority System Milestone", xp: 80, icon: "🎯" },
    { text: "Document Architecture Specifications Blueprint", xp: 45, icon: "📐" }
  ]
};

const SMART_MESSAGES = {
  bored: [
    { at: 30, text: "Still bored? Try changing your environment for a few minutes." }
  ],

  lazy: [
    { at: 45, text: "A small start is better than waiting for perfect motivation." }
  ],

  stressed: [
    { at: 20, text: "Slow breathing can help calm racing thoughts." }
  ],

  energetic: [
    { at: 30, text: "Good energy is powerful when focused on one task." }
  ]
};

const BREATH_PHASES = [
  { text: "Breathe In", duration: 4, class: "inhale" },
  { text: "Hold", duration: 4, class: "" },
  { text: "Breathe Out", duration: 6, class: "exhale" }
];

let currentMood = "bored";
let sessionTransitionsCount = 0;
let userExperiencePoints = parseInt(localStorage.getItem("moodmate_xp")) || 120;
let consecutiveStreakDays = parseInt(localStorage.getItem("moodmate_streak")) || 3;
let chronologicalLog = JSON.parse(localStorage.getItem("moodmate_history")) || [];
let runDurationSeconds = 0;
let executionTimerLoop = null;
let respiratoryCycleLoop = null;
let activeBreathPhaseIdx = 0;

const moodButtons = document.querySelectorAll(".mood-btn");
const funnyText = document.getElementById("funny");
const memeText = document.getElementById("meme");
const motivationText = document.getElementById("motivation");
const hitBtn = document.getElementById("hitBtn");
const liveMood = document.getElementById("liveMood");
const changes = document.getElementById("changes");
const historyList = document.getElementById("history");
const distributionContainer = document.getElementById("distribution");
const timerDisplay = document.getElementById("moodTimer");
const smartMessage = document.getElementById("smartMessage");
const breathCard = document.getElementById("breathingCard");
const breathCircle = document.getElementById("breathCircle");
const breathText = document.getElementById("breathText");
const breathCount = document.getElementById("breathCount");
const actionDeckContainer = document.getElementById("actionDeck");
const toastNotification = document.getElementById("toastNotification");
const progressBar = document.getElementById("progressBar");
const xpCounterDisplay = document.getElementById("xpCounter");
const streakDisplay = document.getElementById("streakCount");
const feedbackInput = document.getElementById("feedbackInput");
const submitFeedbackBtn = document.getElementById("submitFeedback");
const goodFeedbackBtn = document.getElementById("good");
const badFeedbackBtn = document.getElementById("bad");
const feedbackFeedbackText = document.getElementById("suggestion");

const systemCaps = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function formatTimeTicker(totalSecs) {
  const m = String(Math.floor(totalSecs / 60)).padStart(2, "0");
  const s = String(totalSecs % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function displaySystemNotification(msg) {
  toastNotification.textContent = msg;
  toastNotification.classList.add("visible");
  setTimeout(() => toastNotification.classList.remove("visible"), 4000);
}

function transitionDynamicUITheme(targetMood) {
  const theme = MOOD_THEME_ENGINES[targetMood];
  const root = document.documentElement;
  root.style.setProperty("--theme-primary", theme.primary);
  root.style.setProperty("--theme-secondary", theme.secondary);
  root.style.setProperty("--theme-tertiary", theme.tertiary);
  root.style.setProperty("--theme-glow", theme.glow);
}

function executeAIReasoningPipeline() {
  const targets = [funnyText, memeText, motivationText];
  targets.forEach(el => { el.textContent = ""; el.classList.add("loading-pulse"); });

  const phases = [
    "🤖 Synchronizing telemetry interfaces...",
    "📡 Parsing user cognitive signatures...",
    "⚡ Injecting optimized neural reframes..."
  ];

  let idx = 0;
  funnyText.textContent = phases[0];

  const sim = setInterval(() => {
    idx++;
    if (idx < phases.length) {
      funnyText.textContent = phases[idx];
    } else {
      clearInterval(sim);
      targets.forEach(el => el.classList.remove("loading-pulse"));
      const payload = MOOD_CONTENT[currentMood];
      funnyText.textContent = payload.funny;
      memeText.textContent = payload.meme;
      motivationText.textContent = payload.motivation;
    }
  }, 450);
}

function adjustUserXP(val) {
  userExperiencePoints += val;
  localStorage.setItem("moodmate_xp", userExperiencePoints);
  xpCounterDisplay.textContent = `${userExperiencePoints} XP`;
  const pct = Math.min((userExperiencePoints % 500) / 5, 100);
  progressBar.style.width = `${pct}%`;
}

function populateContextualActionDeck(targetMood) {
  actionDeckContainer.innerHTML = "";
  const actions = CONTEXTUAL_ACTION_DECKS[targetMood] || [];

  actions.forEach(action => {
    const pill = document.createElement("div");
    pill.className = "action-pill";
    pill.setAttribute("role", "button");
    pill.innerHTML = `
      <div class="action-pill-left">
        <span class="action-pill-icon">${action.icon}</span>
        <span class="action-pill-title">${action.text}</span>
      </div>
      <span class="action-pill-xp">+${action.xp} XP</span>
    `;
    pill.addEventListener("click", () => {
      adjustUserXP(action.xp);
      displaySystemNotification(`Protocol executed. Earned ${action.xp} XP alignment bonus.`);
      pill.style.pointerEvents = "none";
      pill.style.opacity = "0.4";
    });
    actionDeckContainer.appendChild(pill);
  });
}

function iterateRespiratorySequence() {
  const phase = BREATH_PHASES[activeBreathPhaseIdx];
  breathText.textContent = phase.text;
  breathCircle.className = `breath-circle ${phase.class}`;

  let remaining = phase.duration;
  breathCount.textContent = remaining;

  clearInterval(respiratoryCycleLoop);
  respiratoryCycleLoop = setInterval(() => {
    remaining--;
    breathCount.textContent = remaining;
    if (remaining <= 0) {
      clearInterval(respiratoryCycleLoop);
      activeBreathPhaseIdx = (activeBreathPhaseIdx + 1) % BREATH_PHASES.length;
      iterateRespiratorySequence();
    }
  }, 1000);
}

function evaluateRespiratoryCardRequirements() {
  if (currentMood === "stressed") {
    breathCard.style.display = "block";
    activeBreathPhaseIdx = 0;
    iterateRespiratorySequence();
  } else {
    clearInterval(respiratoryCycleLoop);
    breathCard.style.display = "none";
  }
}

function runSessionChronometer() {
  clearInterval(executionTimerLoop);
  runDurationSeconds = 0;
  timerDisplay.textContent = "00:00";
  smartMessage.textContent = "Pick a mood to begin your session.";

  executionTimerLoop = setInterval(() => {
    runDurationSeconds++;
    timerDisplay.textContent = formatTimeTicker(runDurationSeconds);

    const rules = SMART_MESSAGES[currentMood] || [];
    const hit = rules.find(r => r.at === runDurationSeconds);
    if (hit) {
      smartMessage.style.opacity = "0";
      setTimeout(() => {
        smartMessage.textContent = hit.text;
        smartMessage.style.opacity = "1";
      }, 200);
    }
  }, 1000);
}

function computeTelemetryDistributionVisuals() {
  distributionContainer.innerHTML = "";
  const keys = ["bored", "lazy", "stressed", "energetic"];

  keys.forEach(k => {
    const matches = chronologicalLog.filter(h => h === k).length;
    const pct = chronologicalLog.length === 0 ? 0 : Math.round((matches / chronologicalLog.length) * 100);
    const color = MOOD_THEME_ENGINES[k].primary;
    const row = document.createElement("div");
    row.className = "dist-row";
    row.innerHTML = `
      <div class="dist-top">
        <span>${systemCaps(k)} Baseline</span>
        <span style="color: ${color}; font-weight:700;">${pct}%</span>
      </div>
      <div class="dist-track">
        <div class="dist-fill" style="width: ${pct}%; background-color: ${color}; color: ${color};"></div>
      </div>
    `;
    distributionContainer.appendChild(row);
  });
}

function renderChronologicalLogInterface() {
  historyList.innerHTML = "";
  const slice = chronologicalLog.slice(-4).reverse();
  slice.forEach((mood, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>Mood Selected: <strong>${systemCaps(mood)}</strong></span>
      <span class="text-muted">Node #${chronologicalLog.length - i}</span>
    `;
    historyList.appendChild(li);
  });
}

function executeSystemCoreCalibration(targetMoodKey, manual = true) {
  currentMood = targetMoodKey;

  moodButtons.forEach(btn => {
    const isTarget = btn.dataset.mood === targetMoodKey;
    btn.classList.toggle("active", isTarget);
    btn.setAttribute("aria-checked", isTarget ? "true" : "false");
  });

  if (manual) {
    sessionTransitionsCount++;
    chronologicalLog.push(targetMoodKey);
    localStorage.setItem("moodmate_history", JSON.stringify(chronologicalLog));
    adjustUserXP(15);
  }

  liveMood.textContent = `Model Sync: ${systemCaps(targetMoodKey)}`;
  changes.textContent = sessionTransitionsCount;

  transitionDynamicUITheme(targetMoodKey);
  executeAIReasoningPipeline();
  populateContextualActionDeck(targetMoodKey);
  evaluateRespiratoryCardRequirements();
  runSessionChronometer();
  renderChronologicalLogInterface();
  computeTelemetryDistributionVisuals();
}

moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.mood === currentMood) return;
    executeSystemCoreCalibration(btn.dataset.mood, true);
  });
});

hitBtn.addEventListener("click", () => {
  const pool = ["bored", "lazy", "stressed", "energetic"].filter(m => m !== currentMood);
  const pick = pool[Math.floor(Math.random() * pool.length)];
  displaySystemNotification("Injecting entropy matrix deviation vectors into parsing model.");
  executeSystemCoreCalibration(pick, true);
});

goodFeedbackBtn.addEventListener("click", () => {
  feedbackFeedbackText.textContent = "💜 Glad you liked it!";
  adjustUserXP(20);
});

badFeedbackBtn.addEventListener("click", () => {
  feedbackFeedbackText.textContent = "✨ Got it! We’ll try different suggestions next time.";
});

submitFeedbackBtn.addEventListener("click", () => {
  const value = feedbackInput.value.trim();
  if (value !== "") {
    displaySystemNotification("Feedback submitted successfully!");
    feedbackInput.value = "";
    adjustUserXP(50);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  streakDisplay.textContent = consecutiveStreakDays;
  xpCounterDisplay.textContent = `${userExperiencePoints} XP`;
  progressBar.style.width = `${Math.min((userExperiencePoints % 500) / 5, 100)}%`;

  const anchor = chronologicalLog[chronologicalLog.length - 1] || "bored";
  executeSystemCoreCalibration(anchor, false);
});