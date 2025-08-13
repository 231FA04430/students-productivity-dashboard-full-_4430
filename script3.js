// ===== AUTH =====
function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginTab").classList.add("active");
  document.getElementById("signupTab").classList.remove("active");
}
function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
  document.getElementById("signupTab").classList.add("active");
  document.getElementById("loginTab").classList.remove("active");
}
function login(e) {
  e.preventDefault();
  document.getElementById("authPage").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  showHome();
}
function signup(e) {
  e.preventDefault();
  alert("Account created successfully!");
  showLogin();
}

// ===== PAGE NAVIGATION =====
function showHome() {
  document.getElementById("pageContent").className = "home-bg";
  document.getElementById("pageContent").innerHTML = `
    <div class="home-container">
      <div class="quotes-section">
        <h2>Thought of the Day</h2>
        <textarea id="quoteInput" class="quote-box" placeholder="Write your thought or quote here..."></textarea>
        <button onclick="addQuote()">Add</button>
        <ul id="quotesList"></ul>
      </div>
      <div class="calendar-section">
        <h2>Calendar</h2>
        <div id="calendar"></div>
      </div>
    </div>
  `;
  renderCalendar();
  renderQuotes();
}
function showCalendar() {
  document.getElementById("pageContent").className = "calendar-bg";
  document.getElementById("pageContent").innerHTML = `
    <h2>Calendar</h2>
    <div id="calendar"></div>
  `;
  renderCalendar();
}
function showNotes() {
  document.getElementById("pageContent").className = "notes-bg";
  document.getElementById("pageContent").innerHTML = `
    <h2>Important Notes</h2>
    <input type="text" id="noteTitle" placeholder="Note Title">
    <label><input type="checkbox" id="noteImportant"> Important</label>
    <input type="date" id="noteDeadline">
    <button onclick="addNote()">Add Note</button>
    <ul id="notesList"></ul>
  `;
  renderNotes();
}
function showProfile() {
  document.getElementById("pageContent").className = "profile-bg";
  document.getElementById("pageContent").innerHTML = `
    <div class="profile-box">
      <h2>Profile</h2>
      <label>Username</label>
      <input type="text" id="profileUsername">
      <label>Bio</label>
      <textarea id="profileBio"></textarea>
      <button onclick="saveProfile()">Save</button>
      <button onclick="logout()">Logout</button>
    </div>
  `;
  loadProfile();
}

// ===== LOGOUT =====
function logout() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("authPage").style.display = "flex";
  showLogin();
}

// ===== QUOTES =====
let quotes = [];
function addQuote() {
  let text = document.getElementById("quoteInput").value;
  if (text.trim() === "") return;
  quotes.push({ text, date: new Date().toLocaleDateString() });
  document.getElementById("quoteInput").value = "";
  renderQuotes();
}
function renderQuotes() {
  let list = document.getElementById("quotesList");
  if (!list) return;
  list.innerHTML = quotes.map(q => `<li>${q.date}: ${q.text}</li>`).join("");
}

// ===== NOTES =====
let notes = [];
function addNote() {
  let title = document.getElementById("noteTitle").value;
  let important = document.getElementById("noteImportant").checked;
  let deadline = document.getElementById("noteDeadline").value;
  if (!title || !deadline) return;
  notes.push({ title, important, deadline });
  renderNotes();
}
function renderNotes() {
  let list = document.getElementById("notesList");
  if (!list) return;
  list.innerHTML = notes.map(n => `<li>${n.title} - ${n.deadline} ${n.important ? "(Important)" : ""}</li>`).join("");
}

// ===== PROFILE =====
function saveProfile() {
  localStorage.setItem("profileUsername", document.getElementById("profileUsername").value);
  localStorage.setItem("profileBio", document.getElementById("profileBio").value);
}
function loadProfile() {
  document.getElementById("profileUsername").value = localStorage.getItem("profileUsername") || "";
  document.getElementById("profileBio").value = localStorage.getItem("profileBio") || "";
}

// ===== CALENDAR =====
function renderCalendar() {
  let calendarDiv = document.getElementById("calendar");
  if (!calendarDiv) return;
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let firstDay = new Date(year, month, 1);
  let lastDay = new Date(year, month + 1, 0);
  let table = "<table class='calendar'><tr>";
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  days.forEach(d => table += `<th>${d}</th>`);
  table += "</tr><tr>";
  for (let i = 0; i < firstDay.getDay(); i++) table += "<td></td>";
  for (let d = 1; d <= lastDay.getDate(); d++) {
    let dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    let classes = [];
    if (d === now.getDate()) classes.push("today");
    if (new Date(year, month, d).getDay() === 0) classes.push("sunday");
    if (notes.some(n => n.deadline === dateStr && n.important)) classes.push("important");
    table += `<td class="${classes.join(" ")}">${d}</td>`;
    if (new Date(year, month, d).getDay() === 6) table += "</tr><tr>";
  }
  table += "</tr></table>";
  calendarDiv.innerHTML = table;
}
function signup(e) {
  e.preventDefault();
  // Here you could also store the new user data if needed
  document.getElementById("authPage").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  showHome();
}
