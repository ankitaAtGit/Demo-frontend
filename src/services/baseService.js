import axios from 'axios';

const baseURL = 'http://192.168.200.133:4001';

export default axios.create({
    baseURL
})