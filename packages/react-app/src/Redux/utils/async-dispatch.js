/*
Author: F.Karsegard


resolve a promise using redux-thunk


PayloadResolver is a function resolving your payload,
Reject & ResolveAction creator are the local sync action to dispatch after the promise resolves or not



makePromiseDispatcher = FN<PayloadResolver> => FN <PayloadResolver> => <ActionCreator> => <ResolvedActionCreator> => (Promise, Object={}) => FN<Dispatcher>;



*/

import { compose, curry, identity, prop, tryCatcher } from '@karsegard/composite-js'
import Promise from 'bluebird'

export const makePromiseDispatcher = curry((errorPayloadResolver, payloadResolver, RejectedActionCreator, ResolvedActionCreator) => (promise,args,returnaction=false) => {


  
  return (dispatch, getState) => {
    const success =  compose(dispatch, ResolvedActionCreator, payloadResolver);
    const run = args => promise(args)
                          .then(res => {
                            let action = success(res);
                            return (returnaction === true) ? action:  res;
                          })
                          .catch(compose(Promise.reject, prop('payload'), dispatch, RejectedActionCreator, errorPayloadResolver))

    return tryCatcher(
      Promise.reject,
      run,
      args       
    )

  }
})


export default makePromiseDispatcher(identity, identity);
