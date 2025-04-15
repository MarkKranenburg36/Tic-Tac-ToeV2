// add logic to handle draw

const main = (function () {

    const board = (function () {
        let boardArr = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

        const printBoard = () => console.log(boardArr);

        const placeSymbol = (boardCoordinates) => {
            const row = boardCoordinates.slice(0, 1);
            const col = boardCoordinates.slice(1, 2);
            if (boardArr[row][col] === '-') {
                boardArr[row][col] = game.getcurrentPlayer().Symbol;
                printBoard();
            } else {
                console.log('spot is already chosen.');
                game.playRound(true); // retry round
            }
        }

        const getBoardArr = () => boardArr;

        const reset = () => boardArr = [['', '', ''], ['', '', ''], ['', '', '']];

        return { printBoard, placeSymbol, getBoardArr, reset };
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
            if (currentPlayer === players[0]) {
                return currentPlayer = players[1];
            } else {
                return currentPlayer = players[0];
            }
        }

        const getcurrentPlayer = () => currentPlayer;

        const isCurrentPlayerWinner = (symbolToCheck) => {
            const cell = board.getBoardArr();
            // check is player has 3 on a row horizontaly
            for (let i = 0; i < board.getBoardArr().length; i++) {
                const row = board.getBoardArr()[i];
                if (row[0] === symbolToCheck && row[1] === symbolToCheck && row[2] === symbolToCheck) {
                    displayController.displayWinner();
                }
            }
            // check is player has 3 on a row vertically
            for (let i = 0; i < 3; i++) {
                if (cell[0][i] === symbolToCheck && cell[1][i] === symbolToCheck && cell[2][i]) {
                    displayController.displayWinner();
                }
            }
            // check is player has 3 on a row diagornally
            if (cell[0][0] === symbolToCheck && cell[1][1] === symbolToCheck && cell[2][2] === symbolToCheck) {
                displayController.displayWinner();
            }
            if (cell[0][2] === symbolToCheck && cell[1][1] === symbolToCheck && cell[2][0] === symbolToCheck) {
                displayController.displayWinner();
            }
        }

        const resetGame = () => {
            currentPlayer = players[0];
            board.reset();
            board.printBoard();
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
            displayController.render();
        }

        return {

            getcurrentPlayer,
            switchPlayerTurn,
            playRound,
            resetGame,

        };
    })();

    const displayController = (function () {
        const render = () => {
            displayBoard = document.getElementById('gameBoard');
            displayBoard.innerHTML = `
                <div id="cel1">${board.getBoardArr()[0][0]}</div>
                <div id="cel2">${board.getBoardArr()[0][1]}</div>
                <div id="cel3">${board.getBoardArr()[0][2]}</div>
                <div id="cel4">${board.getBoardArr()[1][0]}</div>
                <div id="cel5">${board.getBoardArr()[1][1]}</div>
                <div id="cel6">${board.getBoardArr()[1][2]}</div>
                <div id="cel7">${board.getBoardArr()[2][0]}</div>
                <div id="cel8">${board.getBoardArr()[2][1]}</div>
                <div id="cel9">${board.getBoardArr()[2][2]}</div>
            `;
        }
        const displayWinner = () => {
            console.log(`${game.getcurrentPlayer().name} has won!!!`);
        }

        return { displayWinner, render };
    })();



    return { game, displayController }
})();