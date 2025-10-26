const input = document.getElementById("journalInput");
const saveBtn = document.getElementById("saveBtn");
const entryList = document.getElementById("entryList");
const themeSelect = document.getElementById("themeSelect");

// 🌸 Load saved entries & theme on page load
document.addEventListener("DOMContentLoaded", () => {
  loadEntries();
  loadTheme();
});

// 💌 Save entry
saveBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;

  const now = new Date();
  const dateTime = now.toLocaleString("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const entry = { text, dateTime };
  saveEntry(entry);
  displayEntry(entry);
  input.value = "";
});

// 🗑️ Delete entry
function attachDeleteListener(button, entry) {
  button.addEventListener("click", () => {
    button.parentElement.remove();
    deleteEntry(entry);
  });
}

// 🩵 Save entry to localStorage
function saveEntry(entry) {
  let entries = JSON.parse(localStorage.getItem("jlEntries")) || [];
  entries.push(entry);
  localStorage.setItem("jlEntries", JSON.stringify(entries));
}

// 🩵 Delete entry from localStorage
function deleteEntry(entryToDelete) {
  let entries = JSON.parse(localStorage.getItem("jlEntries")) || [];
  entries = entries.filter((e) => e.text !== entryToDelete.text || e.dateTime !== entryToDelete.dateTime);
  localStorage.setItem("jlEntries", JSON.stringify(entries));
}

// 📖 Display entry in list
function displayEntry(entry) {
  const li = document.createElement("li");
  li.innerHTML = `
    <div class="entry-content">
      <p class="entry-text">${entry.text}</p>
      <small class="entry-date">${entry.dateTime}</small>
    </div>
    <button class="deleteBtn">✕</button>
  `;
  entryList.appendChild(li);

  const deleteBtn = li.querySelector(".deleteBtn");
  attachDeleteListener(deleteBtn, entry);
}

// 🌼 Load all entries from localStorage
function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("jlEntries")) || [];
  entries.forEach(displayEntry);
}

// 🌈 Theme Switcher Logic
themeSelect.addEventListener("change", () => {
  const selectedTheme = themeSelect.value;
  document.body.className = selectedTheme;
  localStorage.setItem("jlTheme", selectedTheme);
});

// 🎨 Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem("jlTheme") || "blue";
  document.body.className = savedTheme;
  themeSelect.value = savedTheme;
}
