var Observable = require("FuseJS/Observable")

function Sequence(length, stateObservables) {
  var initialMove = "";
  var numOfMoves = 0;
  var mixed = false;
  var sequenceIndex = stateObservables.length;
  stateObservables.add("incomplete");
  var update = function(cellObservable) {
    var value = cellObservable.value;
    var move = cellObservable.value.contents;
    if(move === "" || mixed)
      return;

    if (!initialMove) {
      initialMove = move;
    }
    
    mixed = initialMove !== move ? true : false;
    numOfMoves++;
    
    var state = ""
    if (!mixed && numOfMoves === length) {
      state = "complete";
    } else if(mixed) {
      state = "unattainable";
    } else {
      state = "incomplete";
    }
    stateObservables.replaceAt(sequenceIndex, state);

    // console.log("Cell Row: " + value.position.row);
    // console.log("Cell Column: " + value.position.column);
    // console.log("Sequence Index: " + sequenceIndex);
    // console.log("Sequence Initial Move: " + initialMove);
    // console.log("Sequence Num Of Moves: " + numOfMoves);
    // console.log("Sequence State: " + stateObservables.getAt(sequenceIndex).value);

  };

  return {
    update: update
  }
}

function createSequences(cellObservables, sequenceLength) {
  var sequenceIndex = 0;
  var sequenceStates = Observable();
  var verticalSequences = [],//observe vertical sequences
    horizontalSequences = [],//observe horizontal sequences
    //observe diagonal sequences
    leftToRightDiagonalSequence = Sequence(sequenceLength, sequenceStates);
    rightToLefttDiagonalSequence = Sequence(sequenceLength, sequenceStates);

  cellObservables.forEach(function(cellObservable) {
    var cell = cellObservable.value;
    var row = cell.position.row,
      column = cell.position.column,
      sequence = undefined;

    if (!horizontalSequences[row]) {
      sequence = Sequence(sequenceLength, sequenceStates);
      horizontalSequences[row] = sequence;
    }
    cellObservable.addSubscriber(horizontalSequences[row].update);//subscribe Sequence to cellObservable updates

    if (!verticalSequences[column]) {
      sequence = Sequence(sequenceLength, sequenceStates);
      verticalSequences[column] = sequence;
    }
    cellObservable.addSubscriber(verticalSequences[column].update);

    if (row === column) {//left to right diagonal sequences marked by cells with row and column being equal
      cellObservable.addSubscriber(leftToRightDiagonalSequence.update);
    }
    //right to left diagonal sequences marked by cells with row plus column being equal to sequence length minus one
    if (row + column === (sequenceLength - 1)) { 
      cellObservable.addSubscriber(rightToLefttDiagonalSequence.update);
    }
  });

  return sequenceStates;//return observable sequenceStates
}

module.exports = {
  createSequences: createSequences
}