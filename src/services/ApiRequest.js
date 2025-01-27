import axios from "axios";
import { ApiResponseErrorHandler } from "./ApiResponseErrorHandler";
/**
 * To make API request (GET,POST,PUT,PATCH,DELETE)
 *
 * @author  kym
 * @create  25/jan/2025
 * Parameter must be object type and must be following format
 * @param{
 *          "method": "post",               // api request method (get, post, put, patch, delete)
 *          "url": "api/user/lists",        // api url
 *          "params": { "key" : "value" }   // parameter object to pass api request
 *          "type": "blob"                  // (optional) use this when you need api response as blob type data
 *       }
 * @returns success:
 *              api response object
 *          error:
 *              error message with following format
 *              {
 *                "flag": false,   // to know api response has error
 *                "message": []    // api response error message as array
 *              }
 */
// axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;

export const ApiRequest = async (value) => {
  let result,
    responseType,
    parameter,
    message,
    path = import.meta.env.VITE_REACT_APP_API_URL;
  // Set the AUTH token for any request
  axios.interceptors.request.use((config) => {
    const userToken = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
    config.headers = {
      Authorization: `Bearer ${userToken}`,
      Accept: "application/json",
      "Accept-Language": userLang,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": "true",
    };
    return config;
  });

  // handle error
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        // if status is 401 unauthenticated, remove session and redirect to login page
        throw error;
        // return { "flag": false, "message": [error.response.data.message], "data": error.response };
        //   window.location.href = `${window.location.origin}/Login`;
      } else if (error.response.status === 404) {
        //   window.location.href = `${window.location.origin}/404`;
      } else if (error.response.status === 500) {
        // window.location.href = `${window.location.origin}/500`;
        return {
          flag: false,
          message: [error.response.data.message],
          data: error.response,
        };
      } else if (error.response.status === 403) {
        //   window.location.href = `${window.location.origin}/403`;
      } else {
        throw error;
      }
    }
  );
  // to decide responseType is exists or not
  value.type !== undefined ? (responseType = value.type) : (responseType = "");
  if (
    value.method === "post" ||
    value.method === "patch" ||
    value.method === "put" ||
    value.method === "delete"
  ) {
    parameter = {
      baseURL: path,
      method: value.method,
      url: value.url,
      data: value.params,
      responseType,
    };
  } else {
    parameter = {
      baseURL: path,
      method: value.method,
      url: value.url,
      params: value.params,
      responseType,
    };
  }
  // calling api
  await axios(parameter)
    .then(async (response) => {
      message = await ApiResponseErrorHandler(response);
      message === true
        ? (result = response)
        : (result = { flag: false, message: message, data: response });
    })
    .catch(async (error) => {
      if (error.response === undefined || error.response === "undefined") {
        let url = window.location.href; // get project name from url
        let data = { status: "OK" };
        result = {
          flag: false,
          message: [`Cannot connect to ${url} server`],
          data: data,
        };
      } else if (error.response.status === 401) {
        let obj = error.response.data;
        let message = [];
        if (typeof obj.message === "object") {
          for (let i in obj.message) {
            if (error.response.status === 422) {
              obj.message[i].forEach((data) => {
                message.push(data);
              });
            } else {
              if (typeof obj.message[i] === "object") {
                message.push(obj.message[i][0]);
              } else {
                message.push(obj.message[i]);
              }
            }
          }
        } else {
          message.push(obj.message);
        }
        result = { flag: false, message: message, data: error.response };
      } else {
        try {
          // call api response error handler
          message = await ApiResponseErrorHandler(error.response);
          result = { flag: false, message: message, data: error.response };
        } catch (error) {
          let data = { status: "OK" };
          result = {
            flag: false,
            message: [
              "No internet connection! Please check your internet connection and try again.",
            ],
            data: data,
          };
        }
      }
    });
  return result;
};
