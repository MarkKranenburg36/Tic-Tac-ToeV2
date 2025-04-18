const main = (function () {

    const board = (function () {
        let boardArr = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

        const placeSymbol = (boardCoordinates) => {
            const row = boardCoordinates.slice(0, 1);
            const col = boardCoordinates.slice(1, 2);
            if (boardArr[row][col] === '-') {
                boardArr[row][col] = game.getcurrentPlayer().Symbol;
            } else {
                console.log('spot is already chosen.');
                game.playRound(true); // retry round
            }
        }

        const getBoardArr = () => boardArr;

        const reset = () => boardArr = [['', '', ''], ['', '', ''], ['', '', '']];

        return { placeSymbol, getBoardArr, reset };
    })();

    const game = (function () {

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
        }

        const playRound = (retry = false) => {
            const playerChoice = prompt(
                `Enter ${getcurrentPlayer().name}'s input: `
            );

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
        const displayBoard = document.getElementById('gameBoard');

        const render = () => {
            displayBoard.innerHTML = `
                <div id="cell1" data-cellCoordinates="00">${board.getBoardArr()[0][0]}</div>
                <div id="cell2" data-cellCoordinates="01">${board.getBoardArr()[0][1]}</div>
                <div id="cell3" data-cellCoordinates="02">${board.getBoardArr()[0][2]}</div>
                <div id="cell4" data-cellCoordinates="10">${board.getBoardArr()[1][0]}</div>
                <div id="cell5" data-cellCoordinates="11">${board.getBoardArr()[1][1]}</div>
                <div id="cell6" data-cellCoordinates="12">${board.getBoardArr()[1][2]}</div>
                <div id="cell7" data-cellCoordinates="20">${board.getBoardArr()[2][0]}</div>
                <div id="cell8" data-cellCoordinates="21">${board.getBoardArr()[2][1]}</div>
                <div id="cell9" data-cellCoordinates="22">${board.getBoardArr()[2][2]}</div>
            `;
        }

        render();

        const displayWinner = () => {
            console.log(`${game.getcurrentPlayer().name} has won!!!`);
        }

        const boardCells = displayBoard.querySelectorAll(':scope > div');

        boardCells.forEach(cell => {
            cell.addEventListener('click', () => {
                console.log(cell.dataset.cellcoordinates);
            });
        });

        return { displayWinner, render };
    })();



    return { game, displayController }
})();