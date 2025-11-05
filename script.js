const sheetId = "193wEAE2DjE7P6UZsQBKKfG_vPeVhnFWisllzbfhXWwM";
const sheetName = "Sheet1";
// Remove headers=1 to get all rows including the header
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

fetch(url)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substr(47).slice(0, -2));

    // Get all rows
    const rows = json.table.rows.map(r => r.c.map(c => {
      if (!c) return "";
      // Handle date values
      if (c.v && typeof c.v === 'string' && c.v.startsWith('Date(')) {
        const match = c.v.match(/Date\((\d+),(\d+),(\d+)\)/);
        if (match) {
          const date = new Date(match[1], parseInt(match[2]), match[3]);
          return date.toLocaleDateString();
        }
      }
      // Use formatted value if available, otherwise raw value
      return c.f || c.v || "";
    }));

    // First row is headers, rest is data
    displayMenu(rows[0], rows.slice(1));
  })
  .catch(err => {
    console.error("Error fetching data:", err);
    document.getElementById("menu").innerHTML = "<p>Error loading menu data.</p>";
  });

function displayMenu(headers, data) {
  let html = "<table><tr>" + headers.map(h => `<th>${h}</th>`).join("") + "</tr>";
  for (const row of data) {
    html += "<tr>" + row.map(c => `<td>${c}</td>`).join("") + "</tr>";
  }
  html += "</table>";
  document.getElementById("menu").innerHTML = html;
}