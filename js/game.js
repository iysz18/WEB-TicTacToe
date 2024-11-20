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
    const cells = document.querySelectorAll(".cells"); 

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

    // adds to each cell from the cells nodelist the click event and passes the onClickCell function
    const addEvents = (onCellClick) => {
        cells.forEach(cell => {
            cell.addEventListener("click", onCellClick());
        });
    };
    
    return {
        markCell,
        addEvents,
    }
})();

// the gameController module has to controll of over the game and initializes the gameboardModue
const gameController = (() => {
    // functino to handle the click on each cell clicked
    const handleCellClick = () => {
        if (gameboardModule.markCell(cell, currentPlayer)) {
            // if markCell returns true, swap turns between players because token has been placed
            playersModule.switchTurn();
        }
    };

    // intialize the gamebaord
    const initialize = () => {
        gameboardModule.addEvents(handleCellClick);
    };

    return { initialize };
})();

// start the game by useing gameController to initialize the modules from gameboardModule
gameController.initialize();