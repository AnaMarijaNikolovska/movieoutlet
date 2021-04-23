import axios from "axios";

const GetAllCategories = () => {
    return axios.get("categories");
}

const GetCategoryDetails = (categoryId) => {
    return axios.get(`categories/${categoryId}`);
}

const SaveCategory = (categoryForm) => {
    return axios.post("categories", categoryForm);
}

const EditCategory = (categoryId, categoryForm) => {
    return axios.put(`categories/${categoryId}`, categoryForm);
}

const DeleteCategory = (categoryId) => {
    return axios.delete(`categories/${categoryId}`);
}

export {GetAllCategories, GetCategoryDetails, SaveCategory, EditCategory, DeleteCategory}
