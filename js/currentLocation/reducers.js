import {createReducer} from './utils';
import {RECEIVE_CURRENT_LOCATION} from './constants';

const initialState = {
};

export default createReducer(initialState, {
  [RECEIVE_CURRENT_LOCATION]: (state, payload) => {
    return Object.assign({}, state, payload);
  }
});
