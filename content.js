let previousStatuses = [];

function getStatusColumnValues() {
  const statusColumnIndex = 7; // Status is the 8th column (0-based index = 7)
  const rows = Array.from(document.querySelectorAll("table tbody tr"));
  return rows.map(row => {
    const cells = row.querySelectorAll("td");
    return cells[statusColumnIndex]?.innerText.trim() || "";
  });
}

function checkStatusChange() {
  const currentStatuses = getStatusColumnValues();

  if (previousStatuses.length === 0) {
    previousStatuses = currentStatuses;
    return;
  }

  const isChanged = previousStatuses.some((prev, i) => prev === "Completed" && currentStatuses[i] !== "Completed");

  if (isChanged) {
    const audio = new Audio(chrome.runtime.getURL("sound.mp3"));
    audio.play();
    previousStatuses = currentStatuses; // update to new state
  }
}

// Reload every 5 minutes
setInterval(() => {
  location.reload();
}, 5 * 60 * 1000);

// Check every 10 seconds
setInterval(checkStatusChange, 10000);
