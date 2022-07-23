import axios from "axios";

const url = "https://62d815849c8b5185c782a96d.mockapi.io/wallet";

export const postData = (data) => axios.post(url, data);

export const getData = () => axios.get(url);

export const putData = (id, data) => axios.put(url + "/" + id, data);

export const deleteData = (id) => axios.delete(url + "/" + id);
