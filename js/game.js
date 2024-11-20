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
                    playersModule.switchTurn();
                } else alert("Cell is already occupied!");
            });
        });
    };
    
    return {
        addEvents,
    };
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