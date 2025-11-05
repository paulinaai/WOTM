const sheetId = "193wEAE2DjE7P6UZsQBKKfG_vPeVhnFWisllzbfhXWwM";
const sheetName = "Sheet1"; // change if your sheet is named differently
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}&headers=1`;

fetch(url)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substr(47).slice(0, -2)); // clean wrapper

    // Get headers from "cols"
    const headers = json.table.cols.map(col => col.label || "");

    // Get data rows
    const rows = json.table.rows.map(r => r.c.map(c => (c ? c.v : "")));

    displayMenu(headers, rows);
  });

function displayMenu(headers, data) {
  let html = "<table><tr>" + headers.map(h => `<th>${h}</th>`).join("") + "</tr>";
  for (const row of data) {
    html += "<tr>" + row.map(c => `<td>${c}</td>`).join("") + "</tr>";
  }
  html += "</table>";
  document.getElementById("menu").innerHTML = html;
}