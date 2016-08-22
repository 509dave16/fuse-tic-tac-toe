function createGrid
(numOfRows, numOfCols, cellBorderWidth, noOuterBorder, flattened) {
  var grid = [];

  for (var rowIndex = 0; rowIndex <= numOfRows - 1; rowIndex++) {
    !flattened ? grid.push([]) : grid;
    for (var columnIndex = 0; columnIndex <= numOfCols - 1; columnIndex++) {
      var cell = {};
      cell.contents = "";
      cell.position = {};
      cell.position.row = rowIndex;
      cell.position.column = columnIndex;
      cell.borderWidths = noOuterBorder ? 
        getBorderWidthsForNoOuterBorder(rowIndex, (numOfRows - 1), columnIndex, (numOfCols - 1), cellBorderWidth) : 
        getBorderWidths(cellBorderWidth);
      !flattened ? grid[rowIndex].push(cell) : grid.push(cell);
    }
  }

  return grid;
}

function getBorderWidthsForNoOuterBorder(rowIndex, maxRowIndex, columnIndex, maxColumnIndex, borderWidth) {
  var borderWidths = {
    bottom: borderWidth,
    top: borderWidth,
    left: borderWidth,
    right: borderWidth
  };

  if (rowIndex === 0) { //No top border for the first row
    borderWidths.top = "0";
  } else if (rowIndex === maxRowIndex) { //No bottom border for the last row
    borderWidths.bottom = "0";
  }

  if (columnIndex === 0) { //No left border for the first columnn
    borderWidths.left = "0";
  } else if (columnIndex === maxColumnIndex) { //No right border for the last colum
    borderWidths.right = "0";
  }

  return borderWidths;
}

function getBorderWidths(borderWidth) {
  return {
    bottom: borderWidth,
    top: borderWidth,
    left: borderWidth,
    right: borderWidth
  };
}

module.exports = {
  createGrid: createGrid
};