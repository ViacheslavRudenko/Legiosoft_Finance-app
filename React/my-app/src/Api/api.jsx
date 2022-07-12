import axios from "axios";

const getProducts = () => axios("http://localhost:3000/goods.json");
export { getProducts };
