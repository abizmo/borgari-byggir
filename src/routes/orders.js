import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://borgari-byggir.firebaseio.com/'
});

export default instance;
