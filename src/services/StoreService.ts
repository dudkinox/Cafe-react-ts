import { httpClient } from "../http/client";
import StoreModel, { ImageStore } from "../models/StoreModel";

// const getLogin = (email: string | null, password: string | null) => {
//   return httpClient
//     .get<AccountModel>(`/account/${email}/${password}`)
//     .then((res) => res.data);
// };

const getStoreId = (token: string | null) => {
  return httpClient.get<StoreModel>(`/store/${token}`).then((res) => res.data);
};

const UpdateStoreId = (
  token: string | null,
  name: string | null,
  address: string | undefined,
  time: string | undefined,
  tel: string | undefined,
  web: string | undefined,
  linkmap: string | undefined
) => {
  const data = {
    name: name,
    address: address,
    open: time,
    tel: tel,
    website: web,
    latitude: linkmap,
  };

  return httpClient.put<string>(`/store/update/${token}`, data);
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

const uploadImageStore = (data: File, token: string | null) => {
  var formData = new FormData();
  formData.append("img", data);

  return httpClient.post<ImageStore>(`/store/uploadimg/${token}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
  UpdateStoreId,
  uploadImageStore,
};

export default StoreService;
