const MOODS = {
  bored: {
    funny: "CEO confidence, intern execution.",
    meme: "After one reel: time to fix my life.",
    motivation: "Boredom is a launchpad. Pick one tiny thing."
  },
  lazy: {
    funny: "My to-do list is doing fine without me.",
    meme: "POV: bed has gravitational pull today.",
    motivation: "Rest is fuel. Then move 1%."
  },
  stressed: {
    funny: "Brain has 47 tabs open. None responding.",
    meme: "Deadline: tomorrow. Me: stares at wall.",
    motivation: "Breathe in 4, hold 4, out 6. You got this."
  },
  energetic: {
    funny: "Caffeine + chaos = main character energy.",
    meme: "Ran 3 errands and 1 marathon before lunch.",
    motivation: "Use the energy before it fades."
  }
};

// --- State ---
let currentMood = "bored";
let counts  = JSON.parse(localStorage.getItem("mm_counts")  || '{"bored":0,"lazy":0,"stressed":0,"energetic":0}');
let history = JSON.parse(localStorage.getItem("mm_history") || "[]");
let changes = parseInt(localStorage.getItem("mm_changes")   || "0", 10);

// --- Streak logic ---
const today = new Date().toDateString();
let streakData = JSON.parse(localStorage.getItem("mm_streak") || '{"streak":1,"lastDate":""}');
if (streakData.lastDate !== today) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (streakData.lastDate === yesterday.toDateString()) {
    streakData.streak += 1;
  } else if (streakData.lastDate !== "") {
    streakData.streak = 1;
  }
  streakData.lastDate = today;
  localStorage.setItem("mm_streak", JSON.stringify(streakData));
}
document.getElementById("streak").textContent  = streakData.streak;
document.getElementById("changes").textContent = changes;

// --- Core display function ---
// trackSession=true  → user mood click (records counts + changes)
// trackSession=false → internal call (Hit Me Different / bad auto-refresh / init)
function showMood(mood, trackSession) {
  currentMood = mood;
  document.body.dataset.mood = mood;
  document.getElementById("liveMood").textContent = "Mood " + cap(mood);

  document.querySelectorAll(".mood-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.mood === mood);
  });

  const m = MOODS[mood];
  fade("funny",      m.funny);
  fade("meme",       m.meme);
  fade("motivation", m.motivation);

  if (trackSession) {
    counts[mood] = (counts[mood] || 0) + 1;
    changes++;
    document.getElementById("changes").textContent = changes;
    history = [mood, ...history.filter(h => h !== mood)].slice(0, 4);
    save();
  }

  renderCounts();
  renderDistribution();
  renderHistory();
  document.getElementById("suggestion").textContent = "";
}

function fade(id, text) {
  const el = document.getElementById(id);
  el.style.transition = "opacity .25s, transform .25s";
  el.style.opacity = 0;
  el.style.transform = "translateY(6px)";
  setTimeout(() => {
    el.textContent = text;
    el.style.opacity = 1;
    el.style.transform = "translateY(0)";
  }, 220);
}

function cap(s) { return s[0].toUpperCase() + s.slice(1); }

function save() {
  localStorage.setItem("mm_counts",  JSON.stringify(counts));
  localStorage.setItem("mm_history", JSON.stringify(history));
  localStorage.setItem("mm_changes", String(changes));
}

function renderCounts() {
  document.querySelectorAll(".count").forEach(el => {
    el.textContent = counts[el.dataset.c] || 0;
  });
}

function renderDistribution() {
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  const meta = {
    bored:     { e: "😐", cls: "b-bored" },
    lazy:      { e: "😴", cls: "b-lazy" },
    stressed:  { e: "😵", cls: "b-stressed" },
    energetic: { e: "⚡", cls: "b-energetic" }
  };
  document.getElementById("distribution").innerHTML =
    Object.keys(meta).map(k => {
      const c   = counts[k] || 0;
      const pct = Math.round((c / total) * 100);
      return `<div class="dist-row">
        <div class="dist-top"><span class="l">${meta[k].e} ${cap(k)}</span><span>${c} · ${pct}%</span></div>
        <div class="bar"><span class="${meta[k].cls}" style="width:${pct}%"></span></div>
      </div>`;
    }).join("");
}

function renderHistory() {
  const e = { bored: "😐", lazy: "😴", stressed: "😵", energetic: "⚡" };
  document.getElementById("history").innerHTML =
    history.map((h, i) =>
      `<li><span>${e[h]} ${cap(h)}</span><span class="rank">#${history.length - i}</span></li>`
    ).join("") || '<li class="rank">No history yet</li>';
}

// Hit Me Different — no stat tracking
function hitDifferent() {
  const others = Object.keys(MOODS).filter(m => m !== currentMood);
  showMood(others[Math.floor(Math.random() * others.length)], false);
}

// Feedback
document.getElementById("good").onclick    = () => {
  document.getElementById("suggestion").textContent = "Glad you liked it 👍";
};
document.getElementById("neutral").onclick = () => {
  document.getElementById("suggestion").textContent = "Try Hit Me Different 🎲";
};
document.getElementById("bad").onclick     = () => {
  document.getElementById("suggestion").textContent = "Switching vibe 🎲";
  hitDifferent();
};

// Mood buttons — user-initiated, track session
document.querySelectorAll(".mood-btn").forEach(b => {
  b.onclick = () => showMood(b.dataset.mood, true);
});

// Hit Me Different button
document.getElementById("hitBtn").onclick = hitDifferent;

// Init — no tracking
showMood("bored", false);
renderCounts();
renderDistribution();
renderHistory();