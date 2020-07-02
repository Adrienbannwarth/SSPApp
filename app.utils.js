import params from './app.params'

/**
 * 
 * @param {string} url api route
 * @param {object} parameters request parameters (headers, body, etc...)
 */
async function fetchJson(url, parameters = {}) {

  let token = await HelpersAsyncStorage.get(config.LOCAL_STORAGE_ACCESS_TOKEN)

  console.log("token => ", token);

  if (token) {
    parameters.headers = parameters.headers || {}

    return fetch(config.API_ENDPOINT + url, {
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
