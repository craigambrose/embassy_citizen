import {GET_CURRENT_LOCATION, GET_CURRENT_LOCATION_FAILURE, RECEIVE_CURRENT_LOCATION} from './constants'
import { checkHttpStatus, parseJSON } from './utils';

const locationEndpoint = "https://embassynetwork.com/api/v1/user/craig_ambrose/current_location/occupancies.json";

export function getCurrentLocationRequest(token) {
  return {
    type: GET_CURRENT_LOCATION,
    payload: {
      token: token
    }
  }
}

export function getCurrentLocationFailure(error) {
  return {
    type: GET_CURRENT_LOCATION_FAILURE,
    payload: {
      error: error.message
    }
  }
}

export function receiveCurrentLocation(data) {
    return {
        type: RECEIVE_CURRENT_LOCATION,
        payload: data
    }
}

export function getCurrentLocation(token) {
  console.log("in getCurrentLocation");
  console.log("token is =", token);
  return (dispatch, state) => {
      dispatch(getCurrentLocationRequest(token));
      return fetch(locationEndpoint, {
              credentials: 'include',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          .then(checkHttpStatus)
          .then(parseJSON)
          .then(response => {
            console.log("received response", response);
            dispatch(receiveCurrentLocation(response));
          })
          .catch(error => {
            console.log("error received", error);
            dispatch(getCurrentLocationFailure(error));
          })
     }
}
