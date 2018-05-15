import { BASE_PATH } from '../../config'

function makeApiRequest (endpoint, authenticated, body, method) {
  let token = sessionStorage.getItem('access_token') || null

  if (authenticated) {
    if (!token) {
      window.location.hash = '#'
      throw new Error('No token saved!')
    }

    let config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    if (body && method) {
      config.body = JSON.stringify(body)
    }
    if (method) {
      config.method = method
    }

    return fetch(BASE_PATH + endpoint, config)
      .then(response =>
        response.text()
          .then(text => ({ text, response }))
      )
      .then(({ text, response }) => {
        if (!response.ok) {
          return Promise.reject(text)
        }
        return JSON.parse(text)
      })
      .catch(error => {
        console.error('error catch', error)
        return Promise.reject(error)
      })
  }
}

// This is just a new primitive type named call_api
// These CALL_API primitive can be added to an
// object same as a property would be
export const CALL_API = Symbol('Call API')

// This is an example of  currying
export default store => next => action => {
  // this is asking for the CALL_API
  // symbol(which is a kind of deeply nested property)
  const callAPI = action[CALL_API]

  // If the callAPI symbol is not defined as an "property" on the
  // action object it will move on to the next action
  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  // These are all properties expected to be defined on the callAPI
  // object associated with the CALL_API symbol
  let { endpoint, types, authenticated, body, method, relatedData } = callAPI

  // These are nested properties on the type property of the callAPI
  // symbol of the current action
  const [ requestType, successType, errorType ] = types

  // need to figure out this one
  next({ type: requestType })

  // OMFG WHY IS THIS SO CONVOLUTED!!!!

  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret things
  return makeApiRequest(endpoint, authenticated, body, method)
    .then(response => next({
        response,
        relatedData,
        authenticated,
        type: successType
      })
    )
    .catch(error => next({
        error: error.message || 'There was an error.',
        type: errorType
      })
    )
}
