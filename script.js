const sheetId = "193wEAE2DjE7P6UZsQBKKfG_vPeVhnFWisllzbfhXWwM";
const sheetName = "WOTM"; // change if your sheet is named differently
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

fetch(url)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substr(47).slice(0, -2)); // clean weird Google wrapper
    const rows = json.table.rows.map(r => r.c.map(c => c ? c.v : ""));
    displayMenu(rows);
  });

function displayMenu(rows) {
  const [headers, ...data] = rows;
  let html = "<table><tr>" + headers.map(h => `<th>${h}</th>`).join("") + "</tr>";
  for (const row of data) {
    html += "<tr>" + row.map(c => `<td>${c}</td>`).join("") + "</tr>";
  }
  html += "</table>";
  document.getElementById("menu").innerHTML = html;
}
