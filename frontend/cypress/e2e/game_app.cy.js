describe('Game functionality', function () {

    const empty = '\u200b'

    const colorUnused = 'rgb(128, 128, 128)' // gray
    const colorElsewhere = 'rgb(255, 255, 0)' // yellow
    const colorCorrect = 'rgb(0, 128, 0)' // green
    const colorNeverGuessed = 'rgb(255, 255, 255)' // white

    describe('basic functionality', function () {

        it('page can be opened and is initially empty', function () {
            cy.visit('http://localhost:3000')

            cy.get('.hintArea').find('.hintLetter').each(value => cy.wrap(value).should('have.text', empty))
            cy.get('.keyboardArea').find('.keyboardButton').each(value => cy.wrap(value).should('have.css', 'background-color', colorNeverGuessed))
        })

        it('page accepts input', function () {
            cy.visit('http://localhost:3000')
            cy.get('#keyboardR').click()
            cy.get('#keyboardE').click()
            cy.get('#keyboardA').click()

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 'r')
            cy.get('@hintLetters').eq(1).should('have.text', 'e')
            cy.get('@hintLetters').eq(2).should('have.text', 'a')
            cy.get('@hintLetters').eq(3).should('have.text', empty)
            cy.get('@hintLetters').eq(4).should('have.text', empty)
        })

        it('page allows to edit input', function () {
            cy.visit('http://localhost:3000')
            cy.get('#keyboardR').click()
            cy.get('#keyboardE').click()
            cy.get('#keyboardA').click()

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 'r')
            cy.get('@hintLetters').eq(1).should('have.text', 'e')
            cy.get('@hintLetters').eq(2).should('have.text', 'a')
            cy.get('@hintLetters').eq(3).should('have.text', empty)
            cy.get('@hintLetters').eq(4).should('have.text', empty)

            cy.get('#keyboardD').click()

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 'r')
            cy.get('@hintLetters').eq(1).should('have.text', 'e')
            cy.get('@hintLetters').eq(2).should('have.text', 'a')
            cy.get('@hintLetters').eq(3).should('have.text', 'd')
            cy.get('@hintLetters').eq(4).should('have.text', empty)

            cy.get('#keyboardDel').click()
            cy.get('#keyboardDel').click()

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 'r')
            cy.get('@hintLetters').eq(1).should('have.text', 'e')
            cy.get('@hintLetters').eq(2).should('have.text', empty)
            cy.get('@hintLetters').eq(3).should('have.text', empty)
            cy.get('@hintLetters').eq(4).should('have.text', empty)
        })

        it('submit button is enabled/disabled correctly', function () {
            cy.visit('http://localhost:3000')
            cy.get('#keyboardR').click()
            cy.get('#keyboardE').click()
            cy.get('#keyboardA').click()
            cy.get('#keyboardD').click()
            cy.get('#submitButton').should('be.disabled')

            cy.get('#keyboardS').click()
            cy.get('#submitButton').should('not.be.disabled')

            cy.get('#keyboardDel').click()
            cy.get('#submitButton').should('be.disabled')
        })

        it('page acts on submit input and applies colors', function () {
            cy.visit('http://localhost:3000')
            cy.get('#keyboardR').click()
            cy.get('#keyboardE').click()
            cy.get('#keyboardA').click()
            cy.get('#keyboardD').click()
            cy.get('#keyboardS').click()
            cy.get('#submitButton').click()

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 'r').and('not.have.css', 'background-color', colorNeverGuessed)
            cy.get('@hintLetters').eq(1).should('have.text', 'e').and('not.have.css', 'background-color', colorNeverGuessed)
            cy.get('@hintLetters').eq(2).should('have.text', 'a').and('not.have.css', 'background-color', colorNeverGuessed)
            cy.get('@hintLetters').eq(3).should('have.text', 'd').and('not.have.css', 'background-color', colorNeverGuessed)
            cy.get('@hintLetters').eq(4).should('have.text', 's').and('not.have.css', 'background-color', colorNeverGuessed)

            cy.get('#keyboardR').and('not.have.css', 'background-color', colorNeverGuessed)
            cy.get('#keyboardE').and('not.have.css', 'background-color', colorNeverGuessed)
            cy.get('#keyboardA').and('not.have.css', 'background-color', colorNeverGuessed)
            cy.get('#keyboardD').and('not.have.css', 'background-color', colorNeverGuessed)
            cy.get('#keyboardS').and('not.have.css', 'background-color', colorNeverGuessed)
        })

        it('page acts on submit input, puts further input in right line', function () {
            cy.intercept({
                method: 'PUT',
                url: '/api/games/*',
            }).as('submitGuess')

            cy.visit('http://localhost:3000')
            cy.get('#keyboardR').click()
            cy.get('#keyboardE').click()
            cy.get('#keyboardA').click()
            cy.get('#keyboardD').click()
            cy.get('#keyboardS').click()
            cy.get('#submitButton').click()
            cy.wait('@submitGuess')

            cy.get('#keyboardM').click()
            cy.get('#keyboardO').click()
            cy.get('#keyboardR').click()
            cy.get('#keyboardE').click()

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
            cy.get('@hintLetters').eq(9).should('have.text', empty)
        })

        it('on input submitted that is not a word, page shows error message', function () {
            cy.visit('http://localhost:3000')
            cy.get('#keyboardX').click()
            cy.get('#keyboardX').click()
            cy.get('#keyboardX').click()
            cy.get('#keyboardX').click()
            cy.get('#keyboardX').click()
            cy.get('#submitButton').click()

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', empty)
            cy.get('@hintLetters').eq(1).should('have.text', empty)
            cy.get('@hintLetters').eq(2).should('have.text', empty)
            cy.get('@hintLetters').eq(3).should('have.text', empty)
            cy.get('@hintLetters').eq(4).should('have.text', empty)

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
                cy.get('#keyboardR').click()
                cy.get('#keyboardE').click()
                cy.get('#keyboardA').click()
                cy.get('#keyboardD').click()
                cy.get('#keyboardS').click()
                cy.get('#submitButton').should('not.be.disabled')
                cy.get('#submitButton').click()
                cy.wait('@submitGuess')
            })

            cy.get('#keyboardR').click()
            cy.get('#keyboardE').click()
            cy.get('#keyboardA').click()
            cy.get('#keyboardD').click()
            cy.get('#keyboardS').click()

            cy.get('#submitButton').should('be.disabled')
            cy.get('#giveUpButton').should('be.disabled')
            cy.get('#messageDiv').should('include.text', 'Solution was:')
        })

        it('new game button clears game', function () {
            cy.intercept({
                method: 'PUT',
                url: '/api/games/*',
            }).as('submitGuess')

            cy.visit('http://localhost:3000')

            var looper = Array.from({ length: 2 }, (value, index) => index)
            cy.wrap(looper).each(() => {
                cy.get('#keyboardR').click()
                cy.get('#keyboardE').click()
                cy.get('#keyboardA').click()
                cy.get('#keyboardD').click()
                cy.get('#keyboardS').click()
                cy.get('#submitButton').should('not.be.disabled')
                cy.get('#submitButton').click()
                cy.wait('@submitGuess')
            })

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 'r')
            cy.get('@hintLetters').eq(1).should('have.text', 'e')
            cy.get('@hintLetters').eq(2).should('have.text', 'a')
            cy.get('@hintLetters').eq(3).should('have.text', 'd')
            cy.get('@hintLetters').eq(4).should('have.text', 's')

            cy.get('#newGameButton').click()

            cy.get('@hintLetters').eq(0).should('have.text', empty)
            cy.get('@hintLetters').eq(1).should('have.text', empty)
            cy.get('@hintLetters').eq(2).should('have.text', empty)
            cy.get('@hintLetters').eq(3).should('have.text', empty)
            cy.get('@hintLetters').eq(4).should('have.text', empty)
        })
    })

    const wordIdAbout = 'w1lO79SZ7w8kUiyDPOqjAw'

    describe('run game on "about"', function () {

        it('page can be opened and has correct word', function () {
            cy.visit(`http://localhost:3000/${wordIdAbout}`)
            cy.get('#keyboardA').click()
            cy.get('#keyboardB').click()
            cy.get('#keyboardO').click()
            cy.get('#keyboardU').click()
            cy.get('#keyboardT').click()
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
            cy.get('#keyboardA').click()
            cy.get('#keyboardB').click()
            cy.get('#keyboardO').click()
            cy.get('#keyboardU').click()
            cy.get('#keyboardT').click()
            cy.get('#submitButton').click()

            cy.get('#submitButton').should('be.disabled')
        })

        it('page acts on submit input and marks it correctly', function () {
            cy.visit(`http://localhost:3000/${wordIdAbout}`)
            cy.get('#keyboardT').click()
            cy.get('#keyboardH').click()
            cy.get('#keyboardO').click()
            cy.get('#keyboardS').click()
            cy.get('#keyboardE').click()
            cy.get('#submitButton').click()

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 't').should('have.css', 'background-color', colorElsewhere)
            cy.get('@hintLetters').eq(1).should('have.text', 'h').should('have.css', 'background-color', colorUnused)
            cy.get('@hintLetters').eq(2).should('have.text', 'o').should('have.css', 'background-color', colorCorrect)
            cy.get('@hintLetters').eq(3).should('have.text', 's').should('have.css', 'background-color', colorUnused)
            cy.get('@hintLetters').eq(4).should('have.text', 'e').should('have.css', 'background-color', colorUnused)

            cy.get('#keyboardT').and('have.css', 'background-color', colorElsewhere)
            cy.get('#keyboardH').and('have.css', 'background-color', colorUnused)
            cy.get('#keyboardO').and('have.css', 'background-color', colorCorrect)
            cy.get('#keyboardS').and('have.css', 'background-color', colorUnused)
            cy.get('#keyboardE').and('have.css', 'background-color', colorUnused)
        })

        it('page acts on correct guess, marks it and sets button state correctly', function () {
            cy.intercept({
                method: 'PUT',
                url: '/api/games/*',
            }).as('submitGuess')

            cy.visit(`http://localhost:3000/${wordIdAbout}`)
            cy.get('#keyboardT').click()
            cy.get('#keyboardH').click()
            cy.get('#keyboardO').click()
            cy.get('#keyboardS').click()
            cy.get('#keyboardE').click()
            cy.get('#submitButton').click()
            cy.wait('@submitGuess')

            cy.get('#keyboardA').click()
            cy.get('#keyboardB').click()
            cy.get('#keyboardO').click()
            cy.get('#keyboardU').click()
            cy.get('#keyboardT').click()
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

        it('page acts on submit input and uses precedence of information correctly', function () {
            cy.visit(`http://localhost:3000/${wordIdAbout}`)
            cy.get('#keyboardB').click()
            cy.get('#keyboardO').click()
            cy.get('#keyboardO').click()
            cy.get('#keyboardT').click()
            cy.get('#keyboardS').click()
            cy.get('#submitButton').click()

            cy.get('.hintArea').find('.hintLetter').as('hintLetters')
            cy.get('@hintLetters').eq(0).should('have.text', 'b').should('have.css', 'background-color', colorElsewhere)
            cy.get('@hintLetters').eq(1).should('have.text', 'o').should('have.css', 'background-color', colorUnused)
            cy.get('@hintLetters').eq(2).should('have.text', 'o').should('have.css', 'background-color', colorCorrect)
            cy.get('@hintLetters').eq(3).should('have.text', 't').should('have.css', 'background-color', colorElsewhere)
            cy.get('@hintLetters').eq(4).should('have.text', 's').should('have.css', 'background-color', colorUnused)

            cy.get('#keyboardB').and('have.css', 'background-color', colorElsewhere)
            cy.get('#keyboardO').and('have.css', 'background-color', colorCorrect)
            // no point asserting again on 'O'
            cy.get('#keyboardT').and('have.css', 'background-color', colorElsewhere)
            cy.get('#keyboardS').and('have.css', 'background-color', colorUnused)
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
            cy.get('#keyboardA').click()
            cy.get('#keyboardB').click()
            cy.get('#keyboardO').click()
            cy.get('#keyboardU').click()
            cy.get('#keyboardT').click()
            cy.get('#submitButton').click()
            cy.wait('@submitGuess')

            cy.get('#messageDiv').should('include.text', 'Congratulations!')
            cy.get('#submitButton').should('be.disabled')

            cy.get('#newGameButton').click()
            cy.wait('@newGame')

            cy.get('#keyboardA').click()
            cy.get('#keyboardB').click()
            cy.get('#keyboardO').click()
            cy.get('#keyboardU').click()
            cy.get('#keyboardT').click()
            cy.get('#submitButton').click()
            cy.wait('@submitGuess')

            cy.get('#messageDiv').should('not.include.text', 'Congratulations!')

            cy.get('#keyboardL').click()
            cy.get('#keyboardU').click()
            cy.get('#keyboardC').click()
            cy.get('#keyboardK').click()
            cy.get('#keyboardY').click()
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