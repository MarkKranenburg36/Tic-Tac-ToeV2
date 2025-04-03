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
            console.log(playerToTakeTurn);

            // playerToTakeTurn = (
            //     playerToTakeTurn === playerToTakeTurn[0] ? playerToTakeTurn[1] : playerToTakeTurn[0]
            // )

            if (playerToTakeTurn === players[0]){
                console.log('1');
                return playerToTakeTurn = players[1];
            } else {
                console.log('2');
                return playerToTakeTurn = players[0];
            }
        }
        const getPlayerToTakeTurn = () => playerToTakeTurn;

        console.log(getPlayerToTakeTurn());
        switchPlayerTurn();
        console.log(getPlayerToTakeTurn());

        return {
            playerToTakeTurn,
            getPlayerToTakeTurn,
            switchPlayerTurn
            
        };
    })();

    const displayController = (function () {
        // 

        return {};
    })();



    return { ticTacToe }
})();