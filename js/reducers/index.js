/**
 * Created by kylefang on 4/27/16.
 * @flow
 */

'use strict';

import {combineReducers} from 'redux';

import drawer from './drawer';
import route from './route';
import auth from '../auth/reducers';
import currentLocation from '../currentLocation/reducers';

export default combineReducers({
  auth,
  currentLocation,
  drawer,
  route
})
