import Axios from "axios";

const instance = Axios.create({
    baseURL: 'https://burgerbuilder-88b1c.firebaseio.com/'
});

export default instance;