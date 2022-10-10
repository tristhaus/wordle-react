describe('Game functionality', function () {

    describe('basic functionality', function () {

        it('page can be opened and is initially empty', function () {
            cy.visit('http://localhost:3000')

            cy.get('.hintArea').find('.hintLetter').should('be.empty')
        })

        it('page accepts input', function () {
            cy.visit('http://localhost:3000')
            cy.get('#guessText').type('rea', { delay: 100 })

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 'r')
            cy.get('@hintLetters').eq(1).should('have.text', 'e')
            cy.get('@hintLetters').eq(2).should('have.text', 'a')
            cy.get('@hintLetters').eq(3).should('be.empty')
            cy.get('@hintLetters').eq(4).should('be.empty')
        })

        it('page allows to edit input', function () {
            cy.visit('http://localhost:3000')
            cy.get('#guessText').type('rea', { delay: 100 })

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 'r')
            cy.get('@hintLetters').eq(1).should('have.text', 'e')
            cy.get('@hintLetters').eq(2).should('have.text', 'a')
            cy.get('@hintLetters').eq(3).should('be.empty')
            cy.get('@hintLetters').eq(4).should('be.empty')

            cy.get('#guessText').type('d', { delay: 100 })

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 'r')
            cy.get('@hintLetters').eq(1).should('have.text', 'e')
            cy.get('@hintLetters').eq(2).should('have.text', 'a')
            cy.get('@hintLetters').eq(3).should('have.text', 'd')
            cy.get('@hintLetters').eq(4).should('be.empty')

            cy.get('#guessText').type('{backspace}{backspace}', { delay: 100 })

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 'r')
            cy.get('@hintLetters').eq(1).should('have.text', 'e')
            cy.get('@hintLetters').eq(2).should('be.empty')
            cy.get('@hintLetters').eq(3).should('be.empty')
            cy.get('@hintLetters').eq(4).should('be.empty')
        })

        it('submit button is enabled/disabled correctly', function () {
            cy.visit('http://localhost:3000')
            cy.get('#guessText').type('read', { delay: 100 })
            cy.get('#submitButton').should('be.disabled')

            cy.get('#guessText').type('s', { delay: 100 })
            cy.get('#submitButton').should('not.be.disabled')

            cy.get('#guessText').type('{backspace}', { delay: 100 })
            cy.get('#submitButton').should('be.disabled')
        })

        it('page acts on submit input', function () {
            cy.visit('http://localhost:3000')
            cy.get('#guessText').type('reads', { delay: 100 })
            cy.get('#submitButton').click()

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 'r')
            cy.get('@hintLetters').eq(1).should('have.text', 'e')
            cy.get('@hintLetters').eq(2).should('have.text', 'a')
            cy.get('@hintLetters').eq(3).should('have.text', 'd')
            cy.get('@hintLetters').eq(4).should('have.text', 's')
        })

        it('page acts on submit input, puts further input in right line', function () {
            cy.intercept({
                method: 'PUT',
                url: '/api/games/*',
            }).as('submitGuess')

            cy.visit('http://localhost:3000')
            cy.get('#guessText').type('reads', { delay: 100 })
            cy.get('#submitButton').click()
            cy.wait('@submitGuess')
            cy.get('#guessText').type('more', { delay: 100 })

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 'r')
            cy.get('@hintLetters').eq(1).should('have.text', 'e')
            cy.get('@hintLetters').eq(2).should('have.text', 'a')
            cy.get('@hintLetters').eq(3).should('have.text', 'd')
            cy.get('@hintLetters').eq(4).should('have.text', 's')

            cy.get('@hintLetters').eq(5).should('have.text', 'm')
            cy.get('@hintLetters').eq(6).should('have.text', 'o')
            cy.get('@hintLetters').eq(7).should('have.text', 'r')
            cy.get('@hintLetters').eq(8).should('have.text', 'e')
            cy.get('@hintLetters').eq(9).should('be.empty')
        })

        it('on input submitted that is not a word, page shows error message', function () {
            cy.visit('http://localhost:3000')
            cy.get('#guessText').type('xxxxx', { delay: 100 })
            cy.get('#submitButton').click()

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', '')
            cy.get('@hintLetters').eq(1).should('have.text', '')
            cy.get('@hintLetters').eq(2).should('have.text', '')
            cy.get('@hintLetters').eq(3).should('have.text', '')
            cy.get('@hintLetters').eq(4).should('have.text', '')

            cy.get('#messageDiv').should('have.text', '"xxxxx" is not a valid word')
        })

        it('page allows to make six guesses, no more, shows solution', function () {
            cy.intercept({
                method: 'PUT',
                url: '/api/games/*',
            }).as('submitGuess')

            cy.visit('http://localhost:3000')

            var looper = Array.from({ length: 6 }, (value, index) => index)
            cy.wrap(looper).each(() => {
                cy.get('#guessText').type('reads', { delay: 100 })
                cy.get('#submitButton').should('not.be.disabled')
                cy.get('#submitButton').click()
                cy.wait('@submitGuess')
            })

            cy.get('#guessText').type('reads', { delay: 100 })
            cy.get('#submitButton').should('be.disabled')
            cy.get('#giveUpButton').should('be.disabled')
            cy.get('#messageDiv').should('include.text', 'Solution was:')
        })

        it('new game button clears game', function () {
            cy.visit('http://localhost:3000')

            var looper = Array.from({ length: 2 }, (value, index) => index)
            cy.wrap(looper).each(() => {
                cy.get('#guessText').type('reads', { delay: 100 })
                cy.get('#submitButton').should('not.be.disabled')
                cy.get('#submitButton').click()
            })

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 'r')
            cy.get('@hintLetters').eq(1).should('have.text', 'e')
            cy.get('@hintLetters').eq(2).should('have.text', 'a')
            cy.get('@hintLetters').eq(3).should('have.text', 'd')
            cy.get('@hintLetters').eq(4).should('have.text', 's')

            cy.get('#newGameButton').click()

            cy.get('@hintLetters').eq(0).should('be.empty')
            cy.get('@hintLetters').eq(1).should('be.empty')
            cy.get('@hintLetters').eq(2).should('be.empty')
            cy.get('@hintLetters').eq(3).should('be.empty')
            cy.get('@hintLetters').eq(4).should('be.empty')
        })
    })

    const wordIdAbout = 'w1lO79SZ7w8kUiyDPOqjAw'
    const colorUnused = 'rgb(128, 128, 128)' // gray
    const colorElsewhere = 'rgb(255, 255, 0)' // yellow
    const colorCorrect = 'rgb(0, 128, 0)' // green

    describe('run game on "about"', function () {

        it('page can be opened and has correct word', function () {
            cy.visit(`http://localhost:3000/${wordIdAbout}`)
            cy.get('#guessText').type('about', { delay: 100 })
            cy.get('#submitButton').click()

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 'a').and('have.css', 'background-color', colorCorrect)
            cy.get('@hintLetters').eq(1).should('have.text', 'b').and('have.css', 'background-color', colorCorrect)
            cy.get('@hintLetters').eq(2).should('have.text', 'o').and('have.css', 'background-color', colorCorrect)
            cy.get('@hintLetters').eq(3).should('have.text', 'u').and('have.css', 'background-color', colorCorrect)
            cy.get('@hintLetters').eq(4).should('have.text', 't').and('have.css', 'background-color', colorCorrect)
            cy.get('#messageDiv').should('include.text', 'Congratulations!')
        })

        it('after winning, the submit button is disabled', function () {
            cy.visit(`http://localhost:3000/${wordIdAbout}`)
            cy.get('#guessText').type('about', { delay: 100 })
            cy.get('#submitButton').click()

            cy.get('#submitButton').should('be.disabled')
        })

        it('page acts on submit input and marks it correctly', function () {
            cy.visit(`http://localhost:3000/${wordIdAbout}`)
            cy.get('#guessText').type('those', { delay: 100 })
            cy.get('#submitButton').click()

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 't').should('have.css', 'background-color', colorElsewhere)
            cy.get('@hintLetters').eq(1).should('have.text', 'h').should('have.css', 'background-color', colorUnused)
            cy.get('@hintLetters').eq(2).should('have.text', 'o').should('have.css', 'background-color', colorCorrect)
            cy.get('@hintLetters').eq(3).should('have.text', 's').should('have.css', 'background-color', colorUnused)
            cy.get('@hintLetters').eq(4).should('have.text', 'e').should('have.css', 'background-color', colorUnused)
        })

        it('page acts on correct guess, marks it and sets button state correctly', function () {
            cy.intercept({
                method: 'PUT',
                url: '/api/games/*',
            }).as('submitGuess')

            cy.visit(`http://localhost:3000/${wordIdAbout}`)
            cy.get('#guessText').type('those', { delay: 100 })
            cy.get('#submitButton').click()
            cy.wait('@submitGuess')

            cy.get('#guessText').type('about', { delay: 100 })
            cy.get('#submitButton').click()
            cy.wait('@submitGuess')

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 't').and('have.css', 'background-color', colorElsewhere)
            cy.get('@hintLetters').eq(1).should('have.text', 'h').and('have.css', 'background-color', colorUnused)
            cy.get('@hintLetters').eq(2).should('have.text', 'o').and('have.css', 'background-color', colorCorrect)
            cy.get('@hintLetters').eq(3).should('have.text', 's').and('have.css', 'background-color', colorUnused)
            cy.get('@hintLetters').eq(4).should('have.text', 'e').and('have.css', 'background-color', colorUnused)

            cy.get('@hintLetters').eq(5).should('have.text', 'a').and('have.css', 'background-color', colorCorrect)
            cy.get('@hintLetters').eq(6).should('have.text', 'b').and('have.css', 'background-color', colorCorrect)
            cy.get('@hintLetters').eq(7).should('have.text', 'o').and('have.css', 'background-color', colorCorrect)
            cy.get('@hintLetters').eq(8).should('have.text', 'u').and('have.css', 'background-color', colorCorrect)
            cy.get('@hintLetters').eq(9).should('have.text', 't').and('have.css', 'background-color', colorCorrect)

            cy.get('#submitButton').should('be.disabled')
            cy.get('#giveUpButton').should('be.disabled')
            cy.get('#messageDiv').should('have.text', 'Congratulations!')
        })

        it('new game button clears game', function () {
            cy.intercept({
                method: 'PUT',
                url: '/api/games/*',
            }).as('submitGuess')

            cy.intercept({
                method: 'POST',
                url: '/api/games',
            }).as('newGame')

            cy.visit(`http://localhost:3000/${wordIdAbout}`)
            cy.get('#guessText').type('about', { delay: 100 })
            cy.get('#submitButton').click()
            cy.wait('@submitGuess')

            cy.get('#messageDiv').should('include.text', 'Congratulations!')
            cy.get('#submitButton').should('be.disabled')

            cy.get('#newGameButton').click()
            cy.wait('@newGame')

            cy.get('#guessText').type('about', { delay: 100 })
            cy.get('#submitButton').click()
            cy.wait('@submitGuess')

            cy.get('#messageDiv').should('not.include.text', 'Congratulations!')

            cy.get('#guessText').type('lucky', { delay: 100 })
            cy.get('#submitButton').should('not.be.disabled')
        })
    })

    describe('run game on bad word ID', function () {

        it('page can be opened and shows error message', function () {
            cy.visit('http://localhost:3000/iNvAlId')

            cy.get('#messageDiv').should('have.text', 'Not a known game ID: iNvAlId')
        })
    })
})