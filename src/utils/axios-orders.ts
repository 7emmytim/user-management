import axios from 'axios'

export default axios.create({
    baseURL: 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})