const sudoku = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const sudoku2 = [
  [1, 2, 3],
  [0, 0, 0],
  [0, 0, 0],
];
//przyjmujemy, że 0 oznacza PUSTE POLE

function findNextEmpy(table) {
  for (let a = 0; a < table.length; a++) {
    for (let b = 0; b < table.length; b++)
      if (table[a][b] === 0) {
        //console.debug(`\nEmpty field: [${a},${b}] = ${table[a]}`);
        return [b, a];
      }
  }
}

function checkColumn(val, px, py, table) {
  for (let a = 0; a < table.length; a++) {
    if (a === py) {
      // ////console.debug(`Missed column: [${px},${a}]`)
      continue;
    }
    ////console.debug(`checking: [${px},${a}]`)
    if (table[a][px] === val) {
      //console.debug(` -> Repeated in col on [${a},${px}]\n`);
      return false;
    }
  }
  return true;
}

function checkRow(val, px, py, table) {
  for (let b = 0; b < table.length; b++) {
    if (b !== px && table[py][b] == val) {
      //console.debug(` -> Repeated in row on [${py},${px}]`);
      return false;
    }
  }
  return true;
}

function checkSquare(val, px, py, table) {
  const [sx, sy] = [3 * Math.floor(px / 3), 3 * Math.floor(py / 3)]; //obliczanie współrzędnych lewego górnego pola kwadratu
  // console.log({sy,sx})
  for (let a = 0; a < 3; a++)
    for (let b = 0; b < 3; b++){
    const [cy, cx] = [sy+a, sx+b];
    // console.log([cy,cx])
      if (py !== cy && px !== cx && table[cy][cx] === val) {
        //console.debug(`\nRepeated in square [${sy},${sx}]: [${b},${a}]`);
        return false;
      }
    }
  return true;
}


function duplicate(old) {
  let newArray = [];
  for (let a = 0; a < old.length; a++) newArray[a] = old[a].slice();
  return newArray;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

function solve(to_solve, x = 0, y = 0) {
  let pos = findNextEmpy(to_solve);
  if (!pos) {
    //console.debug(`\n\nNie ma pustych pól!!!!`);
    alert("Rozwiązano :D")
    return to_solve;
  }
  let [px, py] = pos;
  for (let val = 1; val <= to_solve.length; val++) {
    //console.debug(`Checking ${val} for [${py}, ${px}]`);
    let coppied_table = duplicate(to_solve);
    coppied_table[py][px] = val;
    // displayTable(coppied_table);
    // TODO: Checking square
    if (
      checkSquare(val, px, py, coppied_table) &&
      checkColumn(val, px, py, coppied_table) &&
      checkRow(val, px, py, coppied_table) 
    ) {
      //console.debug(`  Przeszła wartość ${val} dla [${py}, ${px}] :D`);
      let next_solution = solve(coppied_table, px, py);
      if (next_solution) return next_solution;
    }

  }
  //console.debug(`  got back...`);
}

// displayTable(solve(sudoku));
