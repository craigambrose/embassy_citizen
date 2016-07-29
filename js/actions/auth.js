/**
 * Login related actions
 * @flow
 */

'use strict';
import type {Action} from './types';

export const ATTEMPT_LOGIN = "ATTEMPT_LOGIN";

export function attemptLogin():Action {
  return {
    type: ATTEMPT_LOGIN
  }
}
