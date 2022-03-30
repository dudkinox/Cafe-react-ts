import { httpClient } from "../http/client";
import AccountModel from "../models/AccountModel";

const getLogin = (email: string | null, password: string | null) => {
  return httpClient
    .get<AccountModel>(`/account/${email}/${password}`)
    .then((res) => res.data);
};

const getFindById = (token: string | null) => {
  return httpClient
    .get<AccountModel>(`/account/${token}`)
    .then((res) => res.data);
};

const postRegister = (
  email: string,
  id_store: string,
  name: string,
  password: string,
  status: boolean,
  tel: string,
  type: string
) => {
  const data = {
    email,
    id_store,
    name,
    password,
    status,
    tel,
    type,
  };
  return httpClient.post<AccountModel>("/account", data);
};

const UpdateProfile = (
  id: string | null,
  name: string,
  email: string,
  idStore: string | undefined,
  tel: string,
  type: string | undefined,
  pass: string,
  status: boolean | undefined
) => {
  const data = {
    email: email,
    id_store: idStore,
    name: name,
    tel: tel,
    type: type,
    password: pass,
    status: status,
  };

  return httpClient.put<AccountModel>(`/account/${id}`, data);
};

const AccountService = {
  getLogin,
  postRegister,
  getFindById,
  UpdateProfile,
};

export default AccountService;
