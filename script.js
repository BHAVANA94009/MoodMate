const MOODS = {
  bored: {
    funny: ["Scrolling again?", "Brain buffering..."],
    meme: ["Me doing nothing for hours"],
    motivation: ["Start small"]
  },
  lazy: {
    funny: ["Bed is winning"],
    meme: ["Tomorrow myth"],
    motivation: ["Even 1% matters"]
  },
  stressed: {
    funny: ["100 tabs open in brain"],
    meme: ["Overthinking pro mode"],
    motivation: ["One step at a time"]
  },
  energetic: {
    funny: ["CEO mode ON"],
    meme: ["Start 10 things finish 0"],
    motivation: ["Use energy NOW"]
  }
};

let currentMood = "bored";

let changes = parseInt(localStorage.getItem("changes") || "0");
let streak = parseInt(localStorage.getItem("streak") || "1");
let lastDate = localStorage.getItem("lastDate");

let moodHistory = JSON.parse(localStorage.getItem("history") || "[]");
let moodCount = JSON.parse(localStorage.getItem("moodCount") || "{}");
let weeklyData = JSON.parse(localStorage.getItem("weekly") || "{}");

// INIT COUNTS
Object.keys(MOODS).forEach(m => {
  if (!moodCount[m]) moodCount[m] = 0;
});

// RANDOM PICK
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// SAVE WEEKLY DATA
function saveWeeklyMood(mood) {
  let today = new Date().toDateString();

  if (!weeklyData[today]) {
    weeklyData[today] = [];
  }

  weeklyData[today].push(mood);

  localStorage.setItem("weekly", JSON.stringify(weeklyData));
}

// SHOW MOOD
function showMood(mood, count = true) {
  currentMood = mood;

  let data = MOODS[mood];

  document.getElementById("funny").innerText = pick(data.funny);
  document.getElementById("meme").innerText = pick(data.meme);
  document.getElementById("motivation").innerText = pick(data.motivation);

  document.getElementById("suggestion").innerText = "";

  if (count) {
    changes++;
    localStorage.setItem("changes", changes);
    document.getElementById("changes").innerText = changes;

    moodHistory.push(mood);
    localStorage.setItem("history", JSON.stringify(moodHistory));

    moodCount[mood]++;
    localStorage.setItem("moodCount", JSON.stringify(moodCount));

    saveWeeklyMood(mood);

    updateAnalytics();
    renderWeeklyChart();
  }
}

// HIT ME DIFFERENT
document.getElementById("hitMe").onclick = () => {
  showMood(currentMood, true);
};

// MOOD CLICK
document.querySelectorAll(".mood").forEach(btn => {
  btn.onclick = () => showMood(btn.dataset.mood, true);
});

// FEEDBACK
function feedback(type) {

  if (type === "good") {
    document.getElementById("suggestion").innerText = "Glad you liked it 👍";
  }

  if (type === "neutral") {
    document.getElementById("suggestion").innerText = "Try Hit Me Different 🎲";
  }

  if (type === "bad") {
    document.getElementById("suggestion").innerText = "Switching vibe 🎲";
    showMood(currentMood, true);
  }
}

document.getElementById("good").onclick = () => feedback("good");
document.getElementById("neutral").onclick = () => feedback("neutral");
document.getElementById("bad").onclick = () => feedback("bad");

// STREAK
function updateStreak() {
  let today = new Date().toDateString();

  if (lastDate !== today) {
    let diff = new Date(today) - new Date(lastDate || today);
    let days = diff / (1000 * 60 * 60 * 24);

    if (days === 1) streak++;
    else streak = 1;

    localStorage.setItem("streak", streak);
    localStorage.setItem("lastDate", today);
  }

  document.getElementById("streak").innerText = streak;
}

// ANALYTICS
function updateAnalytics() {

  let stats = document.getElementById("stats");
  stats.innerHTML = "";

  Object.keys(moodCount).forEach(m => {
    let li = document.createElement("li");
    li.innerText = `${m} → ${moodCount[m]} times`;
    stats.appendChild(li);
  });

  let history = document.getElementById("history");
  history.innerHTML = "";

  moodHistory.slice(-10).forEach(m => {
    let li = document.createElement("li");
    li.innerText = m;
    history.appendChild(li);
  });
}

// WEEKLY CHART (NEW 🔥)
function renderWeeklyChart() {
  let chart = document.getElementById("chart");
  chart.innerHTML = "";

  let days = Object.keys(weeklyData).slice(-7);

  days.forEach(day => {
    let moods = weeklyData[day];

    let count = moods.length;

    let bar = "█".repeat(count);

    let div = document.createElement("div");
    div.innerHTML = `
      <b>${day}</b><br/>
      ${bar} (${count})
    `;

    chart.appendChild(div);
  });
}

// INIT
updateStreak();
updateAnalytics();
renderWeeklyChart();
showMood("bored", false);