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


const gameboardModule = () => {
    // get each cell and store it in a nodelist
    const cellNodeList = document.querySelectorAll(".cell");
    cellNodeList.forEach(cell => {
        cell.addEventListener("click", () => {
            
       });
    });

    // reference to the div "moveLeftDisplay"
    const moveCounter = document.querySelector(".movesLeftDisplay");
    

}; 

gameboardModule();
