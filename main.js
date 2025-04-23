// to do
// verander get current player naar in player object isCurrent?

const main = (function () {

    const board = (function () {
        let boardArr = [
            [
                { symbol: ' ', color: null },
                { symbol: ' ', color: null },
                { symbol: ' ', color: null }
            ],
            [
                { symbol: ' ', color: null },
                { symbol: ' ', color: null },
                { symbol: ' ', color: null }
            ],
            [
                { symbol: ' ', color: null },
                { symbol: ' ', color: null },
                { symbol: ' ', color: null }
            ]
        ];

        let isFreeze = false;

        const printBoard = () => console.log(boardArr);

        const setFreeze = (bool) => isFreeze = bool;

        const getFreeze = () => isFreeze;

        const placeSymbol = (boardCoordinates) => {
            const row = boardCoordinates.slice(0, 1);
            const col = boardCoordinates.slice(1, 2);
            const player = game.getcurrentPlayer();

            if (boardArr[row][col].symbol === ' ') {
                boardArr[row][col].symbol = player.Symbol;
                boardArr[row][col].color = player.color;
            } else {
                game.switchPlayerTurn(); // switch player to give current player another
                // round to chose new cell, this will undo the effect of the
                // switch player call in the playround function
            }
        }

        const getBoardArr = () => boardArr;

        const reset = () => {
            boardArr = [
                [{ symbol: ' ', color: null }, { symbol: ' ', color: null }, { symbol: ' ', color: null }],
                [{ symbol: ' ', color: null }, { symbol: ' ', color: null }, { symbol: ' ', color: null }],
                [{ symbol: ' ', color: null }, { symbol: ' ', color: null }, { symbol: ' ', color: null }],
            ];
            displayController.renderBoard()
        }

        return { placeSymbol, getBoardArr, reset, printBoard, setFreeze, getFreeze, };
    })();

    const game = (function () {

        const players = [
            {
                name: 'Player One',
                displayName: 'Player',
                Symbol: 'X',
                color: 'blue',
            }, {
                name: 'Player Two',
                displayName: 'Player',
                Symbol: 'O',
                color: 'red',
            }
        ];

        const getPlayers = () => players;

        const setPlayerDisplayName = (index, newName) => {
            players[index].displayName = newName;
        }

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
                if (row[0].symbol === symbolToCheck && row[1].symbol === symbolToCheck && row[2].symbol === symbolToCheck) {
                    endGame();
                }
            }
            // check is player has 3 on a row vertically
            for (let i = 0; i < 3; i++) {
                if (cell[0][i].symbol === symbolToCheck && cell[1][i].symbol === symbolToCheck && cell[2][i].symbol === symbolToCheck) {
                    endGame();
                }
            }
            // check is player has 3 on a row diagornally
            if (cell[0][0].symbol === symbolToCheck && cell[1][1].symbol === symbolToCheck && cell[2][2].symbol === symbolToCheck) {
                endGame();
            }
            if (cell[0][2].symbol === symbolToCheck && cell[1][1].symbol === symbolToCheck && cell[2][0].symbol === symbolToCheck) {
                endGame();
            }
        }

        const endGame = () => {
            displayController.displayWinner();
            board.setFreeze(true);
        }

        const resetGame = () => {
            board.setFreeze(false);
            currentPlayer = players[0];
            displayController.renderCurrentPlayerMarker();
            board.reset();
        }

        const inputPlayerDisplayName = (e) => {
            const input = prompt('Enter name:');
            const name = input[0].toUpperCase() + input.slice(1);
            if (e.target.id === 'playerOneDisplay') {
                setPlayerDisplayName([0], name);
            } else {
                setPlayerDisplayName([1], name);
            }
            displayController.renderCurrentPlayerMarker();
        }

        const playRound = (clickedCell) => {
            board.placeSymbol(clickedCell);
            isCurrentPlayerWinner(currentPlayer.Symbol);
            switchPlayerTurn();
            displayController.renderCurrentPlayerMarker();
            displayController.renderBoard();
        }

        return {

            getcurrentPlayer,
            switchPlayerTurn,
            playRound,
            resetGame,
            inputPlayerDisplayName,
            getPlayers,
            setPlayerDisplayName, // verwijder

        };
    })();

    const displayController = (function () {
        const displayBoard = document.getElementById('gameBoard');
        const resetBtn = document.getElementById('resetBtn');
        const playerOneDisplay = document.getElementById('playerOneDisplay');
        const playerTwoDisplay = document.getElementById('playerTwoDisplay');

        const setVh = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        const renderBoard = () => {
            const boardArr = board.getBoardArr();
            displayBoard.innerHTML = `
                <div id="cell1" class='${boardArr[0][0].color === 'red' ? 'playerRed' : 'playerBlue'}' data-cellCoordinates="00">${boardArr[0][0].symbol}</div>
                <div id="cell2" class='${boardArr[0][1].color === 'red' ? 'playerRed' : 'playerBlue'}' data-cellCoordinates="01">${boardArr[0][1].symbol}</div>
                <div id="cell3" class='${boardArr[0][2].color === 'red' ? 'playerRed' : 'playerBlue'}' data-cellCoordinates="02">${boardArr[0][2].symbol}</div>
                <div id="cell4" class='${boardArr[1][0].color === 'red' ? 'playerRed' : 'playerBlue'}' data-cellCoordinates="10">${boardArr[1][0].symbol}</div>
                <div id="cell5" class='${boardArr[1][1].color === 'red' ? 'playerRed' : 'playerBlue'}' data-cellCoordinates="11">${boardArr[1][1].symbol}</div>
                <div id="cell6" class='${boardArr[1][2].color === 'red' ? 'playerRed' : 'playerBlue'}' data-cellCoordinates="12">${boardArr[1][2].symbol}</div>
                <div id="cell7" class='${boardArr[2][0].color === 'red' ? 'playerRed' : 'playerBlue'}' data-cellCoordinates="20">${boardArr[2][0].symbol}</div>
                <div id="cell8" class='${boardArr[2][1].color === 'red' ? 'playerRed' : 'playerBlue'}' data-cellCoordinates="21">${boardArr[2][1].symbol}</div>
                <div id="cell9" class='${boardArr[2][2].color === 'red' ? 'playerRed' : 'playerBlue'}' data-cellCoordinates="22">${boardArr[2][2].symbol}</div>
            `;

            const boardCells = displayBoard.querySelectorAll(':scope > div');

            boardCells.forEach(cell => {
                cell.addEventListener('click', () => {
                    if (board.getFreeze() === false)
                        game.playRound(cell.dataset.cellcoordinates);
                });
            });
        }

        const renderCurrentPlayerMarker = () => {
            const currentPlayer = game.getcurrentPlayer().name;
            const players = game.getPlayers();

            playerOneDisplay.innerHTML = players[0].displayName + ' <span class="playerSymbol playerBlue">X</span>';
            playerTwoDisplay.innerHTML = players[1].displayName + ' <span class="playerSymbol playerRed">O</span>';

            if (currentPlayer === 'Player One' && !board.getFreeze()) {
                playerTwoDisplay.classList.remove('currentPlayer');
                playerOneDisplay.classList.add('currentPlayer');
            } else if (!board.getFreeze()) {
                playerOneDisplay.classList.remove('currentPlayer');
                playerTwoDisplay.classList.add('currentPlayer');
            }
        }

        resetBtn.addEventListener('click', () => game.resetGame());
        playerOneDisplay.addEventListener('click', () => game.inputPlayerDisplayName(event));
        playerTwoDisplay.addEventListener('click', () => game.inputPlayerDisplayName(event));

        const displayWinner = () => {
            console.log(`${game.getcurrentPlayer().name} has won!!!`);
        }

        setVh();
        renderBoard();
        renderCurrentPlayerMarker();

        window.addEventListener('resize', setVh);

        return { displayWinner, renderBoard, renderCurrentPlayerMarker, };
    })();



    return { game, displayController, board }
})();