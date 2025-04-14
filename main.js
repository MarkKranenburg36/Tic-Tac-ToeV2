const main = (function () {

    const board = (function () {
        const boardArr = [['', '', ''], ['', '', ''], ['', '', '']];

        const printBoard = () => console.log(boardArr);

        const placeSymbol = (boardCoordinates) => {
            const row = boardCoordinates.slice(0, 1);
            const col = boardCoordinates.slice(1, 2);
            if(boardArr[row][col] === '') {
                boardArr[row][col] = game.getcurrentPlayer().Symbol;
                printBoard();
            } else {
                console.log('spot is already chosen.');
                game.playRound(true); // retry round
            }
        }

        return { printBoard, placeSymbol, boardArr };
    })();

    const game = (function () {
        board.printBoard();
        
        const players = [
            {
                name: 'Player One',
                Symbol: 'X',
            }, {
                name: 'Player Two',
                Symbol: 'O',
            }
        ];

        let currentPlayer = players[0];

        const switchPlayerTurn = () => {
            if (currentPlayer === players[0]){
                return currentPlayer = players[1];
            } else {
                return currentPlayer = players[0];
            }
        }

        const getcurrentPlayer = () => currentPlayer;

        const isCurrentPlayerWinner = (symbolToCheck) => {
            if (board.boardArr[0][0] === symbolToCheck && board.boardArr[0][0] === board.boardArr[0][1] && board.boardArr[0][1] === board.boardArr[0][2]) {
                console.log('Winner!!!');
            }
        }

        const playRound = (retry = false) => {
            const playerChoice = prompt(
                `Enter ${getcurrentPlayer().name}'s input: `
            );
            console.log(`${getcurrentPlayer().name}'s choise is ${playerChoice}`);

            board.placeSymbol(playerChoice);
            isCurrentPlayerWinner(currentPlayer.Symbol);
            if (!retry) {
                switchPlayerTurn();
            }
        }

        return {

            currentPlayer,
            getcurrentPlayer,
            switchPlayerTurn,
            playRound,
            
        };
    })();

    const displayController = (function () {
        // 

        return {};
    })();



    return { game }
})();