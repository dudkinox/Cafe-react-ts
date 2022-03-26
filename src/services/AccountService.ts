import { httpClient } from "../http/client";
import AccountModel from "../models/AccountModel";

const getLogin = (email: string | null, password: string | null) => {
  return httpClient
    .get<AccountModel>(`/account/${email}/${password}`)
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

const AccountService = {
  getLogin,
  postRegister,
};

export default AccountService;
