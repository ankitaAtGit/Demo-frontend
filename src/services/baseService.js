import axios from 'axios';

const baseURL = 'http://localhost:4001';

export default axios.create({
    baseURL
})