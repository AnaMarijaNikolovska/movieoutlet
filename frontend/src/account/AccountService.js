import axios from "axios";

const GetAllAccounts = () => {
    return axios.get("account");
}

const GetOneAccount = (username) => {
    return axios.get(`account/${username}`);
}

const AddAccount = (accountForm) => {
    return axios.post("account", accountForm);
}

const EditAccount = (username, accountForm) => {
    return axios.put(`account/${username}`, accountForm);
}

const DeleteAccount = (username) => {
    return axios.delete(`account/${username}`);
}

export {GetAllAccounts, GetOneAccount, AddAccount, EditAccount, DeleteAccount}