/**
 * Created by kylefang on 4/27/16.
 * @flow
 */

'use strict';

import {combineReducers} from 'redux';

import drawer from './drawer';
import route from './route';
import auth from '../auth/reducers';

export default combineReducers({
  auth,
  drawer,
  route
})
