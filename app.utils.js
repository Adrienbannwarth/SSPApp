import params from './app.params'

/**
 * 
 * @param {string} url api route
 * @param {object} parameters request parameters (headers, body, etc...)
 */
function fetchJson(url, parameters = {}) {

  return fetch(process.env.REACT_APP_API_ENDPOINT + url, {
    method: parameters.method || "GET",
    headers: parameters.headers || {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem(params.LOCAL_STORAGE_ACCESS_TOKEN) || ""
    },
    body: parameters.body
  })
    .then(res => res.json())
}

/**
 * 
 * @param {string} url api route
 * @param {object} data data form
 */
function fetchForm(url, data = {}) {

  const urlencoded = new URLSearchParams()

  for (let key in data) {
    urlencoded.append(key, data[key])
  }

  return fetchJson(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlencoded.toString()
  })
}


export default {
  fetchReadyData: fetchJson,
  fetchJson,
  fetchForm
}
