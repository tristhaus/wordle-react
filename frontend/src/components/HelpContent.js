const HelpContent = () => {

    return (
        <div>
            <h3>Wordle using React/Redux</h3>
            <p>
                by tristhaus, reimplementing <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a> by <a href="https://twitter.com/powerlanguish">powerlanguage</a>. Code available on <a href="https://github.com/tristhaus/wordle-react">GitHub</a>.
            </p>
            <p>
                Guess the word in six guesses or fewer.
            </p>
            <p>
                For each letter guessed, you get a color telling you whether it is <span className="correct">correct</span>, <span className="elsewhere">used elsewhere</span>, or <span className="unused">not at all</span>.
            </p>
            <p>
                If a letter is in the right spot, but also used in a different location, you only get the <span className="correct">correct</span> hint.
            </p>
            <p>
                Likewise, if a letter is used more than once, but you only entered it once in your guess, you will not more than the <span className="elsewhere">used elsewhere</span> hint.
            </p>
        </div>
    )
}

HelpContent.displayName = 'HelpContent'

export default HelpContent