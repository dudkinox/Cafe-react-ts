import { httpClient } from "../http/client";
import StoreModel from "../models/StoreModel";

// const getLogin = (email: string | null, password: string | null) => {
//   return httpClient
//     .get<AccountModel>(`/account/${email}/${password}`)
//     .then((res) => res.data);
// };

const getStoreId = (token: string | null) => {
  return httpClient.get<StoreModel>(`/store/${token}`).then((res) => res.data);
};

const createStore = (
  address: string,
  idstore: string,
  image: string,
  latitude: string,
  longitude: string,
  name: string,
  open: string,
  status: boolean,
  tel: string,
  total_review: number,
  website: string
) => {
  const data = {
    address,
    idstore,
    image,
    latitude,
    longitude,
    name,
    open,
    status,
    tel,
    total_review,
    website,
  };
  return httpClient.post<StoreModel>("/store/add", data);
};

// const UpdateProfile = (
//   id: string | null,
//   name: string | undefined,
//   email: string | undefined,
//   idStore: string | undefined,
//   tel: string | undefined,
//   type: string | undefined,
//   pass: string | undefined,
//   status: boolean | undefined
// ) => {
//   const data = {
//     email: email,
//     id_store: idStore,
//     name: name,
//     tel: tel,
//     type: type,
//     password: pass,
//     status: status,
//   };

//   return httpClient.put<AccountModel>(`/account/${id}`, data);
// };

const StoreService = {
  createStore,
  getStoreId,
};

export default StoreService;
