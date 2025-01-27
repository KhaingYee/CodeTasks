/**
 * API response error handling function
 *
 * @author kym
 * @param api_response_error_object
 * @returns array
 */
export const ApiResponseErrorHandler = (response) => {
  let err = [];
  let obj;
  if (response.headers["content-type"] === "application/json") {
    return new Promise((resolve, reject) => {
      if (response.status >= 200 && response.status < 300) {
        resolve(true);
      } else if (response.status >= 400 && response.status < 500) {
        if (response.status === 422) {
          let obj = response.data;
          if (obj.hasOwnProperty("errors")) {
            if (typeof obj.errors === "object") {
              for (let i in obj.errors) {
                if (typeof obj.errors[i] === "object") {
                  err.push(obj.errors[i][0]);
                } else {
                  err.push(obj.errors[i]);
                }
              }
            } else {
              err.push(obj.errors);
            }
          } else {
            if (typeof obj.message === "object") {
              for (let i in obj.message) {
                if (typeof obj.message[i] === "object") {
                  err.push(obj.message[i][0]);
                } else {
                  err.push(obj.message[i]);
                }
              }
            } else {
              err.push(obj.message);
            }
          }
          resolve(err);
        } else if (response.status === 404) {
          err.push("Page Not Found Error");
          resolve(err);
        } else if (response.status === 401) {
          err.push(response);
          resolve(response);
        } else {
          err.push(response);
          resolve(err);
        }
      } else if (response.status >= 500 && response.status < 600) {
        err.push("Server Error");
        resolve(err);
      } else {
        resolve(err);
      }
    });
  } else {
    return new Promise((resolve, reject) => {
      obj = response.data;
      if (obj.status === 401) {
        if (typeof obj.message === "object") {
          //422 error validate from back end
          for (let i in obj.message) {
            if (response.status === 422) {
              obj.message[i].forEach((data) => {
                err.push(data);
              });
            } else {
              if (typeof obj.message[i] === "object") {
                err.push(obj.message[i][0]);
              } else {
                err.push(obj.message[i]);
              }
            }
          }
        } else {
          err.push(obj.message);
        }
        resolve(err);
      } else {
        resolve(true);
      }
    });
  }
};
