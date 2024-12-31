import axios from "axios";

let API_URL="https://api-stage.dinesavvy.com/api/v1";

// if(import.meta.env.VITE_DEV_MODE === 'DEV')
// {
//   URL=import.meta.env.VITE_DEV_URL;
// }
// else if(import.meta.env.VITE_DEV_MODE === 'STAGE')
// {
//   URL=import.meta.env.VITE_STAGE_URL;
// }
// else if(import.meta.env.VITE_DEV_MODE === 'LOCAL')
// {
//   URL=import.meta.env.VITE_LOCAL_URL;
// }
// else if(import.meta.env.VITE_DEV_MODE === 'PROD')
// {
//   URL=import.meta.env.VITE_PROD_URL;
// }
// else
// {
//   URL=import.meta.env.VITE_DEV_URL;
// }

// const API_URL = URL;
// const API_URL = "https://fetch-dev.theintellify.net/api/v1";
//Stage ENVIROMENET
// const API_URL = "https://fetch-stage.theintellify.net/api/v1"
//Prod ENVIROMENET
// const API_URL = "https://admin.fetchpaw.com/api/v1"
//LOCAL ENVIROMENET
// const API_URL = "http://127.0.0.1:8000/api/v1";

function getHeader() {
  // const navigate = useNavigate()
  let user = localStorage.getItem("token");
  return user && { Authorization: "Bearer " + user };
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
