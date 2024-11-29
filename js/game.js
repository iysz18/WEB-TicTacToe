const playersModule = (() => {
    // store player names
    const playerX = document.getElementById("player1");
    const playerO = document.getElementById("player2");

    playerX.addEventListener("blur", () => {
        players.X.name = playerX.value;
    });
    
    playerO.addEventListener("blur", () => {
        players.O.name = playerO.value;
    });
    
    const players = {
        X: {
            token: "X",
            name: '',
        },
        O: {
            token: "O",
            name: '',
        }
    }


    let currentPlayer = players.X;

    // to reset the player names
    const resetPlayerNames = () => {
        players.X.name = undefined
        players.O.name = undefined
        console.log(players);
    };
    
    const getCurrentPlayer = () => currentPlayer; 
    const getPlayerToken = (player) => players[player].token;
    const switchTurn = () => {
        currentPlayer = currentPlayer === players.X ? players.O : players.X;
    };

    return {
        getCurrentPlayer,
        getPlayerToken,
        resetPlayerNames,
        switchTurn,
    };
})();

// the gameboardModule binds the click event to each cell and
// holds the variables referecing the DOM
const gameboardModule = (() => {
    // store each cell from the gameboard in a nodelist
    const cells = document.querySelectorAll(".cell"); 

    // the logic to mark the clicked cell if possible (empty = place / occupied = alert players)
    const markCell = (cell, playerToken) => {
        if (!cell.textContent.trim()) {
            // if true place the token of the current player
            cell.textContent = playerToken.token;
            cell.dataset.token = playerToken.token;
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

    // resetting logic of the game
    const resetGame = document.querySelector(".restart");
    resetGame.addEventListener("click", () => {
        cells.forEach(cell => cell.dataset.token = undefined);
        cells.forEach(cell => cell.textContent = "");
        movesLeft = 9;
        movesLeftCount.textContent = movesLeft;
        playersModule.resetPlayerNames();



        // for debugging, it shows the entry of each cell fromt he cell nodeList, to enable it, uncomment or
        // put it into another () => arrow function and call it
        // const tokensObject = {};
        // cells.forEach((cell, index) => {
        //     tokensObject[`cell${index}`] = cell.dataset.token || null; // Use null for unset tokens
        // });

        // console.log(tokensObject); // Log the object to the console
    });
    
    return {
        addEvents,
        getLeftMoves,
        getCellData,
        getdataSetList,
        resetGame,
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
        // Get the latest board state
        let board = gameboardModule.getdataSetList();
    
        // Check for a winner first
        for (const combination of winCombinations) {
            let [a, b, c] = combination; // Destructure the indices from the current combination
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setTimeout(() => {
                    alert(`Player ${playersModule.getCurrentPlayer().name} Won!`);
                }, 0); // Defer to ensure DOM updates
                return true; // Stop further checks after finding a winner
            }
        }
    
        // Check for a draw (if no moves left and no winner)
        const movesLeft = gameboardModule.getLeftMoves();
        if (movesLeft <= 0) {
            setTimeout(() => alert("Game Over! No moves left."), 0);
            return true;
        }
        playersModule.switchTurn();
    
        // No winner or draw; game continues
        return false;
        
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