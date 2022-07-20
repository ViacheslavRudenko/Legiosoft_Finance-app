import axios from "axios";

const url = "https://62d815849c8b5185c782a96d.mockapi.io/wallet";

export const postData = (data) => axios.post(url, data);

export const getData = () => {
  axios
    .get(url)
    .then((resp) => resp)
    .catch((err) => console.log(err));
};
