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
  return httpClient.post<FoodModel>(`/food/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const FoodService = {
  getFoodByID,
  addFoodByID,
};

export default FoodService;
