/*
Author: F.Karsegard


resolve a promise using redux-thunk


PayloadResolver is a function resolving your payload,
Reject & ResolveAction creator are the local sync action to dispatch after the promise resolves or not



makePromiseDispatcher = FN<PayloadResolver> => FN <PayloadResolver> => <ActionCreator> => <ResolvedActionCreator> => (Promise, Object={}) => FN<Dispatcher>;



*/

import { compose, curry, identity, prop, tryCatcher } from '@karsegard/composite-js'
import Promise from 'bluebird'

export const makePromiseDispatcher = curry((errorPayloadResolver, payloadResolver, RejectedActionCreator, ResolvedActionCreator, promise) => {
  return (dispatch, getState) => {

    return tryCatcher(
      Promise.reject,
      identity,
      promise()
        .then(compose(dispatch, ResolvedActionCreator, payloadResolver))
        .catch(compose(Promise.reject, prop('payload'), dispatch, RejectedActionCreator, errorPayloadResolver))
    )

  }
})


export default makePromiseDispatcher(identity, identity);
