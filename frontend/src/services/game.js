import axios from 'axios'
const baseUrl = '/api/games'

const startGame = async id => {
    const url = id ? `${baseUrl}?wordId=${id}` : baseUrl

    try {
        const response = await axios.post(url)

        if (response.status === 201) {
            return [true, response.data]
        }
        else {
            return [false, response.data]
        }
    } catch (error) {
        return [false, error.response.data]
    }
}

const makeGuess = async (gameId, guess) => {
    const requestData = { word: guess }

    const url = `${baseUrl}/${gameId}`

    try {
        const response = await axios.put(url, requestData)

        if (response.status === 200) {
            return [true, response.data]
        }
        else {
            return [false, response.data]
        }
    } catch (error) {
        return [false, error.response.data]
    }
}

const getSolution = async gameId => {
    const url = `${baseUrl}/${gameId}/solution`

    try {
        const response = await axios.get(url)

        if (response.status === 200) {
            return [true, response.data]
        }
        else {
            return [false, response.data]
        }
    } catch (error) {
        return [false, error.response.data]
    }
}

export default { startGame, makeGuess, getSolution }
