import { httpClient } from "../http/client";
import { FoodModel, listFood } from "../models/FoodModel";

const getFoodByID = (id: string | null) => {
  return httpClient.get<FoodModel>(`/food/${id}`).then((res) => res.data);
};

const addFoodByID = (id: string | null, food: listFood, photo: File) => {
  var formData = new FormData();
  formData.append("img", photo);
  formData.append("name", food.name);
  formData.append("price", food.price);
  return httpClient.post(`/food/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const deleteFoodByID = (id: string | null, name: string) => {
  return httpClient.delete(`/food/${id}/${name}`).then((res) => res.data);
};

const FoodService = {
  getFoodByID,
  addFoodByID,
  deleteFoodByID,
};

export default FoodService;
