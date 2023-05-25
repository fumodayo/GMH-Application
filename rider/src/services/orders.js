import axios from "axios";
const API_URL = "http://10.0.2.2:3001/api/v1/orders";

export const getAllOrders = async () => {
  try {
    const { data } = await axios.get(`${API_URL}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};