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
window.foundSolutions = [];

window.copyMatrix = function (matrix) {
  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

  var newMatrix = makeEmptyMatrix(matrix.length);

  for (var row = 0; row < matrix.length; row++) {
    for (var col = 0; col < matrix.length; col++) {
      newMatrix[row][col] = matrix[row][col];
    }
  }

  return newMatrix;
};

window.findNRooksSolution = function (n) {
  window.foundSolutions[n] = {};
  var validStates = {};
  var search = function (solution) {
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        var solution = new Board(this.copyMatrix(solution.rows()));
        if (solution.rows()[row][col] === 0) {
          solution.togglePiece(row, col);
          if (!solution.hasAnyRooksConflicts()) {
            var numPieces = _.reduce(solution.rows(), function (memo, row) {
              return memo + _.reduce(row, function (memo, col) {
                return memo + col;
              }, 0);
            }, 0);
            if (numPieces === n && foundSolutions[n][JSON.stringify(solution.rows())] === undefined) {
              window.foundSolutions[n][JSON.stringify(solution.rows())] = solution.rows();
            } else if (validStates[JSON.stringify(solution.rows())] === undefined) {
              validStates[JSON.stringify(solution.rows())] = 1;
              search(solution);
              solution.togglePiece(row, col);
            }
          } else {
            solution.togglePiece(row, col);
          }
        }
      }
    }
  };

  search(new Board({
    n: n
  }));

  console.log('Single solution for ' + n + ' rooks:', Object.entries(window.foundSolutions[n])[0][1]);
  return window.foundSolutions[n][Object.entries(window.foundSolutions[n])[0][0]];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  //this.findNRooksSolution(n, count);
  var solutionCount = Object.entries(window.foundSolutions[n]).length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
