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
            const player = game.getCurrentPlayer();

            if (boardArr[row][col].symbol === ' ') {
                boardArr[row][col].symbol = player.symbol;
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
                symbol: 'X',
                color: 'blue',
                isCurrentPlayer: true,
            }, {
                name: 'Player Two',
                displayName: 'Player',
                symbol: 'O',
                color: 'red',
                isCurrentPlayer: false,
            }
        ];

        const getPlayers = () => players;

        const setPlayerDisplayName = (index, newName) => {
            players[index].displayName = newName;
        }

        const switchPlayerTurn = () => {
            if (players[0].isCurrentPlayer) {
                players[0].isCurrentPlayer = false
                players[1].isCurrentPlayer = true;
            } else {
                players[0].isCurrentPlayer = true
                players[1].isCurrentPlayer = false;
            }
        }

        const getCurrentPlayer = () => {
            if (players[0].isCurrentPlayer) {
                return players[0];
            } else {
                return players[1];
            }
        }

        const isCurrentPlayerWinner = (currentPlayer) => {
            const symbolToCheck = currentPlayer.symbol;
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
            displayController.printWinnerOnDialog();
            displayController.toggleDiagram();
            board.setFreeze(true);
        }

        const resetGame = () => {
            players[0].isCurrentPlayer = true;
            players[1].isCurrentPlayer = false;
            displayController.renderCurrentPlayerMarker();
            board.reset();
            if (displayController.isDialogOpen()) {
                displayController.toggleDiagram();
            }
            board.setFreeze(false);
        }

        const inputPlayerDisplayName = (e) => {
            const input = prompt('Enter name:');
            const name = input[0].toUpperCase() + input.slice(1);
            if (e.target.id === 'playerOneDisplay') {
                setPlayerDisplayName(0, name);
            } else {
                setPlayerDisplayName(1, name);
            }
            displayController.renderCurrentPlayerMarker();
        }

        const playRound = (clickedCell) => {
            board.placeSymbol(clickedCell);
            isCurrentPlayerWinner(getCurrentPlayer());
            switchPlayerTurn();
            displayController.renderCurrentPlayerMarker();
            displayController.renderBoard();
        }

        return {

            getCurrentPlayer,
            switchPlayerTurn,
            playRound,
            resetGame,
            inputPlayerDisplayName,
            getPlayers,

        };
    })();

    const displayController = (function () {
        const displayBoard = document.getElementById('gameBoard');
        const resetBtn = document.getElementById('resetBtn');
        const playerOneDisplay = document.getElementById('playerOneDisplay');
        const playerTwoDisplay = document.getElementById('playerTwoDisplay');
        const winnerDialog = document.getElementById('winnerDialog');
        const dialogHeader = document.querySelector('#winnerDialog > h1');
        const dialogBtn = document.querySelector('#winnerDialog > button');
        const themeBtn = document.querySelector('header > button');

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
            const currentPlayer = game.getCurrentPlayer().name;
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

        const printWinnerOnDialog = () => {
            let name = null;
            if (game.getCurrentPlayer().displayName === 'Player') {
                name = game.getCurrentPlayer().name;
            } else {
                name = game.getCurrentPlayer().displayName;
            }
            dialogHeader.innerHTML = `${name} wins!`;
        }

        const toggleDiagram = () => {
            if (winnerDialog.open) {
                winnerDialog.classList.remove('dialogShow');
                winnerDialog.close();
            } else {
                winnerDialog.classList.add('dialogShow');
                winnerDialog.show();
            }
        };

        const isDialogOpen = () => winnerDialog.open;

        dialogBtn.addEventListener('click', () => toggleDiagram());
        themeBtn.addEventListener('click', () => toggleTheme());

        const toggleTheme = () => {
            if (document.documentElement.dataset.theme === 'dark') {
                document.documentElement.removeAttribute('data-theme')
                themeBtn.innerHTML = 
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
                    <path
                        d="M6 2h8v2h-2v2h-2V4H6V2ZM4 6V4h2v2H4Zm0 10H2V6h2v10Zm2 2H4v-2h2v2Zm2 2H6v-2h2v2Zm10 0v2H8v-2h10Zm2-2v2h-2v-2h2Zm-2-4h2v4h2v-8h-2v2h-2v2Zm-6 0v2h6v-2h-6Zm-2-2h2v2h-2v-2Zm0 0V6H8v6h2Z">
                    </path>
                </svg>`;
            } else {
                document.documentElement.setAttribute('data-theme', 'dark')
                themeBtn.innerHTML = 
                `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" width="43" height="43" fill="#000000">
                    <path
                        d="M13 3h-2v2h2V3zm4 2h2v2h-2V5zm-6 6h2v2h-2v-2zm-8 0h2v2H3v-2zm18 0h-2v2h2v-2zM5 5h2v2H5V5zm14 14h-2v-2h2v2zm-8 2h2v-2h-2v2zm-4-2H5v-2h2v2zM9 7h6v2H9V7zm0 8H7V9h2v6zm0 0v2h6v-2h2V9h-2v6H9z">
                    </path>
                </svg>`;
            }
        }

        setVh();
        renderBoard();
        renderCurrentPlayerMarker();

        window.addEventListener('resize', setVh);

        return {

            printWinnerOnDialog,
            renderBoard,
            renderCurrentPlayerMarker,
            toggleDiagram,
            isDialogOpen,
            toggleTheme,

        };
    })();



    return { game, displayController, board, }
})();