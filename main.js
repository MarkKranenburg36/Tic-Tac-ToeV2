const main = (function () {

    const gameboard = (function () {
        const boardArr = [['', '', ''], ['', '', ''], ['', '', '']];
        const printBoard = () => console.log(boardArr);

        return { boardArr, printBoard };
    })();

    const ticTacToe = (function () {
        gameboard.printBoard();
        
        const players = [
            {
                playerNum: 1
            }, {
                playerNum: 2
            }
        ];

        let playerToTakeTurn = players[0];

        const switchPlayerTurn = () => {
            playerToTakeTurn = (
                playerToTakeTurn === playerToTakeTurn[0] ? playerToTakeTurn[1] : playerToTakeTurn[0]
            )
        }
        const getPlayerToTakeTurn = () => playerToTakeTurn;

        return {
            playerToTakeTurn,
            getPlayerToTakeTurn,
            switchPlayerTurn
            
        };
    })();

    console.log(ticTacToe.getPlayerToTakeTurn());
    console.log(ticTacToe.switchPlayerTurn());
    console.log(ticTacToe.getPlayerToTakeTurn());

    const displayController = (function () {
        // 

        return {};
    })();



    return { ticTacToe }
})();