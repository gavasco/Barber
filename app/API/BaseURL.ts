import axios from "axios";

const url = axios.create({
    baseURL: 'https://api.b7web.com.br/devbarber/api'
});

export default url;