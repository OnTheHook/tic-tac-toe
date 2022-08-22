const game = (() => {
    //Create game board using module pattern
    const gameBoard = (() => {
        let board = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']]
        return { board }
    })();

    //Create player using factory function
    const player = (mark, name) => {
        if ((!name) && mark === 'X') {
            name = 'Player One'
        } else if ((!name) && mark === 'O') {
            name = 'Player Two'
        }

        return { mark, name }
    }




    //Controls the flow of the game
    const play = () => {

        let playerOne
        let playerTwo
        let turn
        const playerOneName = document.getElementById('player-one')
        const playerTwoName = document.getElementById('player-two')

        let playing = false

        const winnerDiv = document.querySelector('.winner')
        winnerDiv.addEventListener('click', (e) => {
            winnerDiv.classList.remove('visible')
        })

        //Button to start game and initiate players
        const startButton = document.getElementById('start')
        startButton.addEventListener('click', () => {
            playing = true
            playerOne = player('X', playerOneName.value)
            playerTwo = player('O', playerTwoName.value)
            turn = playerOne
            console.log(playerOne)
        })



        let over = false
        const boxes = document.querySelectorAll('.box')



        //Button to reset game
        const resetButton = document.getElementById('restart')
        resetButton.addEventListener('click', () => {
            boxes.forEach(box => {
                box.textContent = ''
            })
            gameBoard.board = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']]
            playing = true
            over = false
            turn = playerOne
            winnerDiv.textContent = ''

        })



        //Set divs so that if you click on a spot it will check place the marker and check to see if someone has won
        boxes.forEach(box => box.addEventListener('click', () => {
            if (playing && !over) {
                let x = parseInt(box.id[0])
                let y = parseInt(box.id[1])
                let valid = checkValid(x, y)
                if (valid) {
                    placeMarker(turn, x, y)
                    box.textContent = turn.mark
                    if (checkWinner(turn)) {
                        console.log(turn)
                        console.log('Wins')
                        winnerDiv.textContent = turn.name + ' wins!'
                        winnerDiv.classList.add('visible')
                        playing = false
                        over = true
                    } else if (tieGame()) {
                        playing = false
                        over = true
                        console.log('Tie')
                        winnerDiv.textContent = 'Tie game. Nobody wins.'
                        winnerDiv.classList.add('visible')
                    } else {
                        if (turn === playerOne) {
                            turn = playerTwo
                        } else {
                            turn = playerOne
                        }
                    }
                } else {
                    console.log('Not a valid spot')
                    return
                }
            }
        }
        ))


        //function to check if a valid position has been chosen
        const checkValid = (posX, posY) => {
            if (posX > 2 || posX < 0 || posY > 2 || posY < 0) {
                return false
            }
            console.log(posX)
            console.log(posY)
            if (gameBoard.board[posX][posY] != '_') {
                return false
            }

            return true
        }

        //function to place marker on board
        const placeMarker = (playerTurn, xSpot, ySpot) => {
            gameBoard.board[xSpot][ySpot] = playerTurn.mark
            console.log(gameBoard.board[0].toString())
            console.log(gameBoard.board[1].toString())
            console.log(gameBoard.board[2].toString())
        }

        //function to check if someone has won the game
        const checkWinner = (potentialWinner) => {
            console.log(potentialWinner)
            const allEqual = (arr, marker) => arr.every(v => v === marker)
            for (let i = 0; i < 3; i++) {
                if (allEqual(gameBoard.board[i], potentialWinner.mark)) {
                    console.log('horizontal win')
                    return true
                }
            }

            for (let i = 0; i < 3; i++) {
                let testArr = []
                for (let p = 0; p < 3; p++) {
                    testArr.push(gameBoard.board[p][i])
                }
                if (allEqual(testArr, potentialWinner.mark)) {
                    console.log('vertical win')
                    return true
                }
            }

            let testArr1 = []
            let testArr2 = []
            for (let i = 0; i < 3; i++) {
                testArr1.push(gameBoard.board[i][i])
                testArr2.push(gameBoard.board[2 - i][i])
            }

            if (allEqual(testArr1, potentialWinner.mark)) {
                console.log('diagonal win 1')
                return true
            } else if (allEqual(testArr2, potentialWinner.mark)) {
                console.log(testArr2)
                console.log('diagonal win 2')
                return true
            }
            return false
        }

        //function to check for tie game
        const tieGame = () => {
            for (let i = 0; i < 3; i++) {
                for (let p = 0; p < 3; p++) {
                    if (gameBoard.board[i][p] === '_') {
                        return false
                    }
                }
            }
            return true
        }



    }

    return { play }

})();

game.play();