import params from '../app.params'
import { AsyncStorage } from 'react-native';
import HelpersAsyncStorage from "../utils/HelpersAsyncStorage";
import config from "../config";

/**
 * 
 * @param {string} url api route
 * @param {object} parameters request parameters (headers, body, etc...)
 */
async function fetchJson(url, parameters = {}) {

  let token = await HelpersAsyncStorage.get(process.env.LOCAL_STORAGE_ACCESS_TOKEN)

  console.log("token => ", token);

  if (token) {
    parameters.headers = parameters.headers || {}

    return fetch(process.env.REACT_APP_API_ENDPOINT + url, {
      method: parameters.method || "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token || "",
        ...parameters.headers,
      },
      body: parameters.body
    })
      .then(res => res.json())
  } else {
    throw Error("pas bon")
  }
}

/**
 * 
 * @param {string} url api route
 * @param {object} data data form
 */


function fetchForm(url, data = {}) {
  console.log(config);

  const urlencoded = new URLSearchParams()

  for (let key in data) {
    urlencoded.append(key, data[key])
  }

  return fetch(config.API_ENDPOINT + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: urlencoded.toString()
  })
    .then(res => res.json())
}

export default {
  fetchReadyData: fetchJson,
  fetchJson,
  fetchForm
}
