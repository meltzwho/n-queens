/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function (n) {
  var board = new Board({
    n: n
  });

  var search = function (row) {
    if (row === n) {
      return board;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyRooksConflicts()) {
        return search(row + 1);
      }

      board.togglePiece(row, i);
    }
  }

  board = search(0);

  console.log('Single solution for ' + n + ' rooks:', board.rows());
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0;
  var board = new Board({
    n: n
  });

  var search = function (row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyRooksConflicts()) {
        search(row + 1);
      }

      board.togglePiece(row, i);
    }
  }

  search(0);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var board = new Board({
    n: n
  });
  var solved = false;
  var search = function (row) {
    if (row === n) {
      solved = true;
      return board;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyQueensConflicts()) {
        search(row + 1);
      }
      if (solved) {
        return;
      }
      board.togglePiece(row, i);
    }
  }
  search(0);

  console.log('Single solution for ' + n + ' queens:', board.rows());
  return board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  if (n === 2 || n === 3) {
    return 0;
  }
  var solutionCount = 0;
  var board = new Board({
    n: n
  });

  var search = function (row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyQueensConflicts()) {
        search(row + 1);
      }

      board.togglePiece(row, i);
    }
  }

  search(0);


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
