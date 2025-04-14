// todo:
// logica om te controleren of 1 van de spelers gewonnen heeft zou denk ik niet onder board object moeten vallen

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

        const isCurrentPlayerWinner = (symbolToCheck) => {
            if (boardArr[0][0] === symbolToCheck && boardArr[0][0] === boardArr[0][1] && boardArr[0][1] === boardArr[0][2]) {
                
                console.log('Winner!!');
                
            }
        }

        return { printBoard, placeSymbol, isCurrentPlayerWinner };
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

        const playRound = (retry = false) => {
            const playerChoice = prompt(
                `Enter ${getcurrentPlayer().name}'s input: `
            );
            console.log(`${getcurrentPlayer().name}'s choise is ${playerChoice}`);

            board.placeSymbol(playerChoice);
            board.isCurrentPlayerWinner(currentPlayer.Symbol);
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