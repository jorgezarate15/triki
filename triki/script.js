let selectedPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', '']; //las 9 posiciones (las 9 celdas vacias)
let gameActive = true; //para saber si el juego esta activo o no

// combinaciones ganadoras
const winningCombinations = [
    [0, 1, 2], [3, 4, 5],[6, 7, 8], //horizontal
    [0, 3, 6],[1, 4, 7],[2, 5, 8], //vertical
    [0, 4, 8],[2, 4, 6] //diagonal
];

window.addEventListener('load', function(){
    //elementos dom
    const cells = document.querySelectorAll('.cell');
    const results = document.getElementById('results');
    const resetButton = document.getElementById('reset');
    const playerXBtn = document.getElementById('playerX');
    const playerOBtn = document.getElementById('playerO');
    const selectedPlayerDisplay = document.getElementById('selected-player');

    //even listeners para seleccionar el jugador
    playerXBtn.addEventListener('click', () => selectPlayer('X'));
    playerOBtn.addEventListener('click', () => selectPlayer('O'));

    //llamados a las celdas
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    //even listener para el boton de reiniciar
    resetButton.addEventListener('click', resetGame);
//acaba el llamado de los elementos del dom
//inicio creacion de cada funcion
    function selectPlayer(player) {
        selectedPlayer = player;
        if (player === 'X') {
            playerXBtn.classList.add('active');
            playerOBtn.classList.remove('active');
        } else {
            playerOBtn.classList.add('active');
            playerXBtn.classList.remove('active');
        }
        selectedPlayerDisplay.textContent = `Jugador seleccionado: ${selectedPlayer}`;
    }

    function handleCellClick(index){
        //verificar si el juego esta activo y si la celda esta vacia
        if(!gameActive || gameBoard[index] !== ''){
            return;
        }
        gameBoard[index] = selectedPlayer;
        cells[index].textContent = selectedPlayer;

        //ver si existe ganador
        if(checkWinner()){
            showWinner(selectedPlayer);
            gameActive = false;
            return;
        } 
    }

    function checkWinner(){
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameBoard[index] !== '' && gameBoard[index] === gameBoard[combination[0]];
            });
        });
    }
    function showWinner(winner){
        results.textContent = `¡${winner} gana!`;
        results.className = 'winner';
    }

    function resetGame(){
        gameBoard = ['','','','','','','','',''];
        gameActive = true;

        cells.forEach(cell => {
            cell.textContent ='';
        });
        results.textContent='Escoge una celda ';
        results.className = '';
    }
});