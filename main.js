const main = (function () {

    function createGameboard() {
        const boardArr = [1, 2];
        const printBoard = () => console.log(boardArr);

        return { boardArr, printBoard };
    }

    function createPlayer () {
        let score = 0;
        const getScore = () => score;
        const giveScore = () => score++;

        return { score, getScore, giveScore };
    }

    const player1 = createPlayer();
    const player2 = createPlayer();

    console.log(player1.getScore());
    player1.giveScore();
    console.log(player1.getScore());

    const Gameboard = createGameboard();













})();