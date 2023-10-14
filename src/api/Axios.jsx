import axios from 'axios';

export const baseAxios = axios.create({
  baseURL: 'https://find-my-guide.site/api/',
  // baseURL: '',
  headers: {
    'Content-Type': 'application/json'
    // Authorization: sessionStorage.getItem("token"),
  }
});

// axiosInstance.interceptors.request.use(
//   function (config) {
//     config.headers["Content-Type"] = "application/json";
//     config.headers["Authorization"] = sessionStorage.getItem("token");
//     return config;
//   },
//   function (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;
//     console.log(error);
//     if (status === 401) {
//       // if (error.response.data === 'Expired JWT') {
//       const originalRequest = config;
//       const res = await axios.get(
//         `//i9c110.p.ssafy.io/api/auth/refresh`,
//         // `//localhost:8083/api/auth/refresh`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: localStorage.getItem("refreshToken"),
//           },
//         }
//       );
//       console.log(res);
//       sessionStorage.setItem("token", res.data.accessToken);
//       localStorage.setItem("refreshToken", res.data.refreshToken);
//       originalRequest.headers.Authorization = res.data.accessToken;
//       return await axios(originalRequest);
//     }
//   }
// );
