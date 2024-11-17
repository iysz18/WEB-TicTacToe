// players are hardcoded for the testing purpose and will be replacedwith dynamic playercreation
const playerModule = (() => {
    const players = {
        X: { token: "X" },
        O: { token: "O" },
    };

    const getToken = (playerToken) => players[playerToken]?.token;

    return {
        getToken,
    }
})();


const cellArray = document.querySelectorAll(".cell");

// testing: iterating over the cellArray, adding evetlistener to change textContent to X
cellArray.forEach(cell => {
    cell.addEventListener("click", () => {
        cell.textContent = "X";
    });
});