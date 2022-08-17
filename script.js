const game = (() => {
    //Create game board using module pattern
    const gameBoard = (() => {
        let board = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']]
        return { board }
    })();

    //Create player using factory function
    const player = (mark) => {
        return { mark }
    }

    const playerOne = player('X')
    const playerTwo = player('O')


    const play = () => {
        let turn = playerOne
        let button = document.querySelector('button')
        let xCoordinate = document.getElementById('x-coordinate')
        let yCoordinate = document.getElementById('y-coordinate')

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
                    return true
                }
            }

            for (let i = 0; i < 3; i++) {
                let testArr = []
                for (let p = 0; p < 3; p++) {
                    testArr.push(gameBoard.board[i][p])
                }
                if (allEqual(testArr, potentialWinner.mark)) {
                    return true
                }
            }

            for (let i = 0; i < 3; i++) {
                let testArr = []
                let testArr2 = []
                testArr.push(gameBoard.board[i][i])
                testArr2.push(gameBoard.board[i][2 - i])
                if (i === 2) {
                    if (allEqual(testArr, potentialWinner.mark)) {
                        return true
                    }
                    if (allEqual(testArr2, potentialWinner.mark)) {
                        return true
                    }
                }
            }
            return false
        }

        //function to check for tie game
        const tieGame = () => {
            for (let i = 0; i < 3; i++) {
                for(let p = 0; p < 3; p++) {
                    if (gameBoard.board[i][p] === '_') {
                        return false
                    }
                }
            }
            return true
        }

        button.addEventListener('click', (e) => {
            e.preventDefault()
            let x = xCoordinate.value
            let y = yCoordinate.value
            let valid = checkValid(x, y)
            if (valid) {
                placeMarker(turn, x, y)
                if(checkWinner(turn)){
                    console.log(turn)
                    console.log('Wins')
                } else if (tieGame()){
                    console.log('Tie')
                } else {
                    if (turn === playerOne) {
                        turn = playerTwo
                    } else {
                        turn = playerOne
                    }
                }
            } else{
                console.log('Not a valid spot')
                return
            }
        })
        

    }
    return {play}

})();

game.play();