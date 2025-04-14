// note:
// closures worden nu niet goed gebuikt. inplaats van in board boardArr te returnen zou je set... en get... moeten doen

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
            // check is player has 3 on a row horizontaly
            for (let i = 0; i < board.boardArr.length; i++) {
                const row = board.boardArr[i];
                if (row[0] === symbolToCheck && row[1] === symbolToCheck && row[2] === symbolToCheck) {
                    displayController.displayWinner();
                }
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
        const displayWinner = () => {
            console.log(`${game.getcurrentPlayer().name} has won!!!`);
        }

        return { displayWinner };
    })();



    return { game, displayController }
})();