import axios from "axios";

let API_URL="https://api-stage.dinesavvy.com/v2/api/v1";


function getHeader() {
  let user = localStorage.getItem("token"); // Authorization token
  let businessid = JSON.parse(localStorage.getItem("selectedBusiness"))?.businessId; // Business ID
  let locationid = JSON.parse(localStorage.getItem("selectedBusiness"))?._id;  // Location ID

  let headers = {};
  if (user) {
    headers.Authorization = user;
  }
  if (businessid) {
    headers.businessid = businessid;
  }
  if (locationid) {
    headers.locationid = locationid;
  }

  return headers;
}

export default class Http {
  static get(url) {
    return new Promise((resolve, reject) => {
      let token = getHeader();
      axios({
        method: "get",
        url: API_URL + "/" + url,
        headers: token,
      })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
          if (error?.response?.status === 401) {
            window.location.replace("/login")
          }
        });
    });
  }
  static post(url, body) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      let token = getHeader();
      axios({
        method: "post",
        url: `${API_URL}/${url}`,
        data: body,
        headers: token,
      })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  static patch(url, body) {
    return new Promise((resolve, reject) => {
      let token = getHeader();
      axios({
        method: "patch",
        url: `${API_URL}/${url}`,
        data: body,
        headers: token,
      })
        .then(function (response) {
          if (response.data && response.data.success) {
            resolve(response.data);
          } else {
            reject(response.data);
          }
        })
        .catch(function (error) {
          reject(error.response.data);
        });
    });
  }

  static delete(url) {
    return new Promise((resolve, reject) => {
      let token = getHeader();
      axios({
        method: "delete",
        url: `${API_URL}/${url}`,
        headers: token,
      })
        .then(function (response) {
          if (response.data && response.data.success) {
            resolve(response.data);
          } else {
            reject(response.data);
          }
        })
        .catch(function (error) {
          reject(error.response.data);
        });
    });
  }
}
