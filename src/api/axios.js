import axios from "axios";
import { BASE_URL } from "./domain";

export default axios.create({
  baseURL: BASE_URL,
});
