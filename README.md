# fuse-tic-tac-toe
A simple game of Tic Tac Toe implemented using the Fuse platform. Meant to be a demonstration project.

# WARNING
When cloning this repository use the following command since there are submodules in the repo:
```
git clone --recursive https://github.com/509dave16/fuse-tic-tac-toe.git
```

# Summary of Implementation
The gist of the implementation is this:

1. A list of observable Cells is observed by Sequences and the UX representation of the cells.
	- Each Sequence is subscribed to the appropriate Cell observables(i.e. the first row Sequence is subscribed to Cells at (0,0), (0,1), (0,2))
	- Each Sequence produces essentially a Sequence State observable that could have one of the following values: incomplete, unattainable, complete
		- incomplete means that not all of Sequence's moves(i.e. Cells being marked) have been Made
		- unattainable means that two different players have made a move in the Sequence, making it impossible for only one player to make all the moves
		- complete means that all the moves of the Sequence have been made by one player only
	- UX is bound to the contents(i.e. X or O) of each Cell observable
2. Sequences produce two count(func) observables that indicate how many Winning and Incomplete Sequences there are.
3. A Game State observable is produced from evaluating the aforementioned count observables and a Made Move observable
	- 1 or more Winning Sequences indicate that the Game State should be "winner"
	- 0 Incomplete Sequences indicate that the Game State should be a "draw"(i.e. all the sequences are "unattainable")
	- The Made Move observable when true indicates that the Game State should be "nextTurn"(i.e. it's other player's turn)
4. Last but not least Game State has one subscriber that will update the Status observable with a message and:
	- Set the Game Over observable to true if the Game State was "winner" or "draw"
	- Switch the Turn observable to the other player's marker(i.e. X or O) and set Made Move observable to false
5. Finally there is one function called makeMove that essentially updates the appropriate Cell observable when a Cell in the UX is clicked and sets Made Move observable to true
	- makeMove will be aborted if the Cell has already been marked with X or O or the Game Over observable is true

