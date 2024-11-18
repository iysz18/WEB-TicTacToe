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
