// players are hardcoded for the testing purpose and will be replacedwith dynamic playercreation
const playerModule = (() => {
    const players = {
        X: { token: "X" },
        O: { token: "O" },
    };

    let currentPlayerTurn = players.X;

    const getToken = (playerToken) => players[playerToken]?.token;
    const switchTurn = () => {
        currentPlayerTurn = currentPlayerTurn === players.X ? players.O : players.X; 
    };
    
    return {
        getToken,
        switchTurn,        
    }
})();




const cellArray = document.querySelectorAll(".cell");

// testing: iterating over the cellArray, adding evetlistener to change textContent to X
cellArray.forEach(cell => {
    cell.addEventListener("click", () => {
        cell.textContent = "X";
    });
});