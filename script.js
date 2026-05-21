const leaderboardCSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQbu-x0A3E3xaDuKiZHAIjTDcV-XsDkpQJ3NuX9Qg8FGLfRhu6bC_0qYwOeKpaToA/pub?gid=797355487&single=true&output=csv";

const matchesCSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQbu-x0A3E3xaDuKiZHAIjTDcV-XsDkpQJ3NuX9Qg8FGLfRhu6bC_0qYwOeKpaToA/pub?gid=690767260&single=true&output=csv";

const tipsCSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQbu-x0A3E3xaDuKiZHAIjTDcV-XsDkpQJ3NuX9Qg8FGLfRhu6bC_0qYwOeKpaToA/pub?gid=114534825&single=true&output=csv";

const playersCSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQbu-x0A3E3xaDuKiZHAIjTDcV-XsDkpQJ3NuX9Qg8FGLfRhu6bC_0qYwOeKpaToA/pub?gid=1596992856&single=true&output=csv";

async function loadCSV(url) {
  const response = await fetch(url);
  const data = await response.text();
  return data.split("\n").map(row => row.split(","));
}

// Leaderboard
async function loadLeaderboard() {
  const rows = await loadCSV(leaderboardCSV);

  let html = "";

  rows.forEach((row, index) => {
    html += "<tr>";

    row.forEach(cell => {
      if(index === 0){
        html += `<th>${cell}</th>`;
      } else {
        html += `<td>${cell}</td>`;
      }
    });

    html += "</tr>";
  });

  document.getElementById("leaderboard-table").innerHTML = html;
}

// Matcher
async function loadMatches() {
  const rows = await loadCSV(matchesCSV);

  let html = "";

  rows.forEach((row, index) => {
    html += "<tr>";

    row.forEach(cell => {
      if(index === 0){
        html += `<th>${cell}</th>`;
      } else {
        html += `<td>${cell}</td>`;
      }
    });

    html += "</tr>";
  });

  document.getElementById("matches-table").innerHTML = html;
}

// Tips
async function loadTips() {
  const rows = await loadCSV(tipsCSV);

  let html = "";

  rows.forEach((row, index) => {
    html += "<tr>";

    row.forEach(cell => {
      if(index === 0){
        html += `<th>${cell}</th>`;
      } else {
        html += `<td>${cell}</td>`;
      }
    });

    html += "</tr>";
  });

  document.getElementById("tips-table").innerHTML = html;
}

let allTips = [];

async function loadPlayerButtons() {

  const playerRows = await loadCSV(playersCSV);
  const tipsRows = await loadCSV(tipsCSV);

  allTips = tipsRows;

  let buttonsHTML = "";

  playerRows.slice(1).forEach(row => {

    const playerName = row[0];

    if(playerName){

      buttonsHTML += `
        <button onclick="showPlayerTips('${playerName}')">
          ${playerName}
        </button>
      `;
    }

  });

  document.getElementById("player-buttons").innerHTML = buttonsHTML;
}

function showPlayerTips(playerName){

  let html = `
    <tr>
      <th>Namn</th>
      <th>Match ID</th>
      <th>Tipp A</th>
      <th>Tipp B</th>
      <th>Poäng</th>
    </tr>
  `;

  allTips.slice(1).forEach(row => {

    if(row[0] === playerName){

      html += "<tr>";

      row.forEach((cell,index) => {

        if(index <= 4){
          html += `<td>${cell}</td>`;
        }

      });

      html += "</tr>";
    }

  });

  document.getElementById("player-tips-table").innerHTML = html;
}

function showSection(sectionId){

  document.getElementById("leaderboard-section").style.display = "none";
  document.getElementById("matches-section").style.display = "none";
  document.getElementById("tips-section").style.display = "none";
  document.getElementById("players-section").style.display = "none";

  document.getElementById(sectionId).style.display = "block";
}

loadLeaderboard();
loadMatches();
loadTips();
loadPlayerButtons();

showSection('leaderboard-section');
