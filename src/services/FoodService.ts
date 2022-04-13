import { httpClient } from "../http/client";
import { FoodModel } from "../models/FoodModel";

const getFoodByID = (id: string | null) => {
  return httpClient.get<FoodModel>(`/food/${id}`).then((res) => res.data);
};

const FoodService = {
  getFoodByID,
};

export default FoodService;
