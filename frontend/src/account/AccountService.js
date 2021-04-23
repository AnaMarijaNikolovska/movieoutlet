import axios from "axios";

const GetAllAccounts = () => {
    return axios.get("accounts");
}

const GetOneAccount = (username) => {
    return axios.get(`accounts/${username}`);
}

const LoginUser = (loginDto) => {
    return axios.post("accounts/sign-in", loginDto);
}

const AddAccount = (accountForm) => {
    return axios.post("accounts", accountForm);
}

const EditAccount = (username, accountForm) => {
    return axios.put(`accounts/${username}`, accountForm);
}

const DeleteAccount = (username) => {
    return axios.delete(`accounts/${username}`);
}

const AccountCredentials = (username, password) => {
    return 'Basic ' + window.btoa(username + ":" + password);
}

export {GetAllAccounts, GetOneAccount, AddAccount, EditAccount, DeleteAccount, AccountCredentials, LoginUser}
