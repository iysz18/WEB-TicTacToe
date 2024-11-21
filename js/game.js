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
                    checkWinner(); // checks for winner and for 0 available moves
                    playersModule.switchTurn();
                } else alert("Cell is already occupied!");
            });
        });
    };

    // referencing the movesLeftDisplay to change the amount of possible moves left
    let movesLeft = 9;
    const movesLeftCount = document.querySelector(".movesLeftCount");
    const updateLeftMoves = () => movesLeftCount.textContent = --movesLeft;

    // retrieve the movesLeft variable
    const getLeftMoves = () => movesLeft;

    const getCellData = () => {
        cells.forEach(cell => console.log(cell.dataset.token));
    };
    
    return {
        addEvents,
        getLeftMoves,
        getCellData,
    };
})();

const checkWinner = () => {
    // TODO: implement the checkWinner function: cancel game when winner or no mvoes left
    
};

// the gameController module has to controll of over the game and initializes the gameboardModue
const gameController = (() => {
    // after each turn update movesLeft count and check for winner
    // intialize the gamebaord
    const initialize = () => {
        gameboardModule.addEvents();
    };

    return { initialize, };
})();

// start the game by useing gameController to initialize the modules from gameboardModule
gameController.initialize();