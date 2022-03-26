import { httpClient } from "../http/client";
import AccountModel from "../models/AccountModel";

const getLogin = (email: string | null, password: string | null) => {
  return httpClient
    .get<AccountModel>(`/account/${email}/${password}`)
    .then((res) => res.data);
};

const AccountService = {
  getLogin,
};

export default AccountService;
