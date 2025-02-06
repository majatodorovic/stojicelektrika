/* eslint-disable camelcase */
import axios from "axios";
import Cookies from "js-cookie";

/**
 * Generate customer token
 * @returns {string} Generated cutomer token
 */

const generateCustomerToken = () =>
  `device_${Math.random().toString(12)}${Date.now()}`;

class Api {
  constructor(customer_token, api_url) {
    this.customer_token = customer_token;
    this.api_url = api_url;
  }

  /**
   * Execute the API call
   *
   * @param {"LIST","GET"|"PUT"|"POST"|"DELETE"} method The HTTP method to use.
   * @param {string} path The path to the API, without the domain and API version suffix.
   * @param {?{}} payload The payload to send in the request.
   *
   * @return {Promise<APIResponse>}
   */
  _execute(method, path, payload = null) {
    return new Promise((resolve, reject) => {
      axios({
        method,
        url: this.api_url + path.replace(/^\//, ""),
        headers: { "customer-token": this.customer_token },
        data: payload,
      })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  /**
   * Execute the get API call
   *
   * @param {string} path The path to the API, without the domain and API version suffix.
   *
   * @return {Promise<APIResponse>}
   */
  get(path) {
    return this._execute("GET", path);
  }

  /**
   * Execute the pet API call
   *
   * @param {string} path The path to the API, without the domain and API version suffix.
   * @param {?{}} payload The payload to send in the request.
   *
   * @return {Promise<APIResponse>}
   */
  put(path, payload = null) {
    return this._execute("PUT", path, payload);
  }

  /**
   * Execute the post API call
   *
   * @param {string} path The path to the API, without the domain and API version suffix.
   * @param {?{}} payload The payload to send in the request.
   *
   * @return {Promise<APIResponse>}
   */
  post(path, payload) {
    return this._execute("POST", path, payload);
  }

  /**
   * Execute the list API call
   *
   * @param {string} path The path to the API, without the domain and API version suffix.
   * @param {?{}} payload The payload to send in the request.
   *
   * @return {Promise<APIResponse>}
   */
  list(path, payload) {
    return this._execute("LIST", path, payload);
  }

  /**
   * Execute the delete API call
   *
   * @param {string} path The path to the API, without the domain and API version suffix.
   *
   * @return {Promise<APIResponse>}
   */
  delete(path) {
    return this._execute("DELETE", path);
  }
}

export const ApiHandler = () => {
  if (!process.env.API_URL) {
    throw new Error("process.env.REACT_API_URL is not defined");
  }
  let token = Cookies.get("token");
  if (!token) {
    token = generateCustomerToken();
    Cookies.set("token", token, { expires: 365 });
  }

  const api = new Api(token, process.env.API_URL);
  return api;
};
