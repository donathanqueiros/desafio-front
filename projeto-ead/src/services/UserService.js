import axios from "axios";

axios.defaults.params = { token: "1r41be68b7d579567db3b83c9b603431" };
axios.defaults.headers.get["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

const API_BASE_URL = "https://desafio.eadplataforma.com/api/1";

var querystring = require("querystring");

class UserService {
  getAll() {
    return axios.get(`${API_BASE_URL}/users`);
  }

  getByNameEmail(value) {
    return axios.get(`${API_BASE_URL}/search?q=${value}`);
  }
  editUser(user) {
    return axios.post(
      `${API_BASE_URL}/update/${user.id}`,
      querystring.stringify(user)
    );
  }

  deleteUser(id) {
    return axios.post(`${API_BASE_URL}/delete/${id}`, id);
  }

  deleteUsers(ids) {
    return axios.post(`${API_BASE_URL}/delete-many/[${ids}]`);
  }
}

export default new UserService();
