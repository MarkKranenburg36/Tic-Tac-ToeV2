const main = (function () {

    const board = (function () {
        const boardArr = [['', '', ''], ['', '', ''], ['', '', '']];

        const printBoard = () => console.log(boardArr);

        const placeSymbol = (boardCoordinates) => {
            const row = boardCoordinates.slice(0, 1);
            const col = boardCoordinates.slice(1, 2);
            if(boardArr[row][col] === '') {
                boardArr[row][col] = game.getPlayerToTakeTurn().playerSymbol;
                game.switchPlayerTurn();
                printBoard();
            } else {
                console.log('spot is already chosen.');
                game.playRound();
            }
        }

        const checkForWinner = () => {
            for (let index = 0; index < boardArr[0].length; index++) {
                const element = boardArr[0][index];
                console.log(element);
                
            }
        }

        return { printBoard, placeSymbol, checkForWinner };
    })();

    const game = (function () {
        board.printBoard();
        
        const players = [
            {
                name: 'Player One',
                playerSymbol: 'X',
            }, {
                name: 'Player Two',
                playerSymbol: 'O',
            }
        ];

        let playerToTakeTurn = players[0];

        const switchPlayerTurn = () => {
            if (playerToTakeTurn === players[0]){
                return playerToTakeTurn = players[1];
            } else {
                return playerToTakeTurn = players[0];
            }
        }

        const getPlayerToTakeTurn = () => playerToTakeTurn;

        const playRound = () => {
            const playerChoice = prompt(
                `Enter ${getPlayerToTakeTurn().name}'s input: `
            );
            console.log(`${getPlayerToTakeTurn().name}'s choise is ${playerChoice}`);

            board.placeSymbol(playerChoice);
            board.checkForWinner();
        }

        return {

            playerToTakeTurn,
            getPlayerToTakeTurn,
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