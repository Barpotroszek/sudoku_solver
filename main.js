function createTable(fields) {
  /** Creating table */
  const values = [];

  for (let a = 0; a < Math.sqrt(fields.length); a++) {
    const line = [];
    for (let b = 0; b < Math.sqrt(fields.length); b++) {
      let field = fields.find((f) => {
        let [y, x] = [
          parseInt(f.getAttribute("row")),
          parseInt(f.getAttribute("col")),
        ];
        return y == a && x == b;
      });
      line.push(field.value ? parseInt(field.value) : 0);
    }
    values.push(line);
  }
  displayTable(values);
  return values;
}

function displayTable(table) {
    /** Displaying formated table in console */
  let to_display = "[\n";
  for (const line of table) {
    to_display += "   [";
    to_display += line.join(", ") + "]\n";
  }
  to_display += "]";
  console.log(to_display);
}

window.onload = () => {
  /** Creating fields for sudoku*/
  const mainDiv = document.getElementById("sudoku");
  for (let a = 0; a < 9; a++) {
    const row = document.createElement("div");
    for (let b = 0; b < 9; b++) {
      const child = document.createElement("input");
      child.setAttribute("row", a);
      child.setAttribute("col", b);
      child.setAttribute("class", "fields");
      child.addEventListener("keydown", (ev) => {
        if (ev.code == "Tab") return;
        console.log(ev);
        console.log(/[(Numpad)(Digit)]\d/.test(ev.code));
        ev.target.value = "";
      });
      child.addEventListener("keyup", (ev) => {
        if (ev.code == "Tab") return;
        if (!/ *[(Numpad)(Digit)]\d/.test(ev.code) || ev.key == "0")
          ev.target.value = "";
      });
      row.appendChild(child);
    }
    row.setAttribute("class", "rowDiv");
    mainDiv.appendChild(row);
  }

  document.getElementById("solve").addEventListener("click", () => {
    const collection = document.getElementsByClassName("fields");
    const fields = [].slice.call(collection);

    var table = createTable(fields);
    table = solve(table);
    displayTable(table)
    console.log(table);
    fields.forEach((field) => {
      let data = [
        parseInt(field.getAttribute("row")),
        parseInt(field.getAttribute("col")),
      ];
      field.value = table[data[0]][data[1]];
    });
  });
  document.getElementById("clear").addEventListener("click", ()=>{
    for (const field of document.getElementsByClassName("fields")) {
        field.value = "";
    }
  })
};
