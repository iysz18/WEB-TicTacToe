const playersModule = (() => {
    const players = { X: "X", O: "O" };

    let currentPlayer = players.X; 

    const getCurrentPlayer = () => currentPlayer; 
    const getPlayerToken = (player) => players[player];
    const switchTurn = () => {
        currentPlayer = currentPlayer === players.X ? players.O : players.X;
    };

    return {
        getCurrentPlayer,
        getPlayerToken,
        switchTurn,
    };
})();

// the gameboardModule binds the click event to each cell and
// holds the variables referecing the DOM
const gameboardModule = (() => {
    // store each cell from the gameboard in a nodelist
    const cells = document.querySelectorAll(".cell"); 

    // the logic to mark the clicked cell if possible (empty = place / occupied = alert players)
    const markCell = (cell, token) => {
        if (!cell.textContent.trim()) {
            // if true place the token of the current player
            cell.textContent = token;
            cell.dataset.token = token;
            return true;
        } else {
            alert("Cell is already occupied!");
            return false;
        }
    };    

    // add to each cell the click event, mark the cell with the currenPlayers
    // token if the cell is not occupied
    const addEvents = () => {
        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                const currentPlayer = playersModule.getCurrentPlayer();
                if (!cell.textContent.trim()) {
                    markCell(cell, currentPlayer);
                    // update the moves left 
                    updateLeftMoves();
                    checkWinner.checkCombinations(); // checks for winner and for 0 available moves
                    playersModule.switchTurn();
                } else alert("Cell is already occupied!");
            });
        });
    };

    // referencing the movesLeftDisplay to change the amount of possible moves left
    let movesLeft = 9;
    const movesLeftCount = document.querySelector(".movesLeftCount");
    const updateLeftMoves = () => movesLeftCount.textContent = --movesLeft;

    // get the movesLeft variable
    const getLeftMoves = () => movesLeft;

    const getCellData = () => {
        cells.forEach(cell => console.log(cell.dataset.token));
    };


    const getdataSetList = () => {
        let dataTokens = Array.from(cells).map(cell => cell.dataset.token || "");
        return dataTokens;
    };
    
    return {
        addEvents,
        getLeftMoves,
        getCellData,
        getdataSetList,
    };
})();

const checkWinner = (() => {
    // store every possible combination in an 2D array
    
    const winCombinations = [
        // Rows
        [0, 1, 2], // row 0
        [3, 4, 5], // row 1
        [6, 7, 8], // row 2
    
        // Columns
        [0, 3, 6], // col 0
        [1, 4, 7], // col 1
        [2, 5, 8], // col 2
    
        // Diagonals
        [0, 4, 8], // top-left to bottom-right
        [2, 4, 6], // top-right to bottom-left
    ];

    const checkCombinations = () => {
        // store the gamebaord as an array, gets updated after each turn
        let board = gameboardModule.getdataSetList();

        // iterate over and check if any combination is met
        for (const combination of winCombinations) {
            let [a, b, c] = combination; // Destructure the indices from the current combination
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                console.log("in if");
                setTimeout(() => {
                    alert(`Player ${playersModule.getCurrentPlayer()} Won!`);
                });
            }
        }
    };

    return { checkCombinations };
})();

// the gameController module has to controll of over the game and initializes the gameboardModue
const gameController = (() => {
    // intialize the gamebaord
    const initialize = () => {
        gameboardModule.addEvents();
    };

    return { initialize, };
})();

// start the game by useing gameController to initialize the modules from gameboardModule
gameController.initialize();