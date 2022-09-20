import axios from 'axios'
const baseUrl = '/api/blogs/'

let authHeader = null

const setToken = token => authHeader = `Bearer ${token}`

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async blog => {
    try {
        const config = {
            headers: { 'Authorization': authHeader }
        }
        const response = await axios.post(baseUrl, blog, config)

        return { data: response.data, tokenExpired: false }
    }
    catch (exception) {
        console.error('blog service error', exception)
        if (exception.response?.status === 401) {
            return { data: null, tokenExpired: true }
        }
        else {
            return { data: null, tokenExpired: false }
        }
    }
}

const update = async blog => {
    try {
        const config = {
            headers: { 'Authorization': authHeader }
        }

        const blogUpdate = { likes: blog.likes }
        const response = await axios.put(`${baseUrl}/${blog.id}`, blogUpdate, config)

        return { data: response.data, tokenExpired: false }
    }
    catch (exception) {
        console.error('blog service error', exception)
        if (exception.response?.status === 401) {
            return { data: null, tokenExpired: true }
        }
        else {
            return { data: null, tokenExpired: false }
        }
    }
}

const remove = async blog => {
    try {
        const config = {
            headers: { 'Authorization': authHeader }
        }

        await axios.delete(`${baseUrl}/${blog.id}`, config)

        return { tokenExpired: false }
    }
    catch (exception) {
        console.error('blog service error', exception)
        if (exception.response?.status === 401) {
            return { tokenExpired: true }
        }
        else {
            return {  tokenExpired: false }
        }
    }
}

export default { setToken, getAll, create, update, remove }