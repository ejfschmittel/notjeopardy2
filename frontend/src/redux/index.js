import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './root-reducer'


const logger = (store) => (next) => {
  if(!console.group){
    return next
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState())
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState())
    console.groupEnd(action.type);
    return returnValue
  }
}

    

const INITIAL_STATE = {}


const enhancers = []
const middleware = [
    thunk,
]
if(process.env.NODE_ENV !== 'production'){
  //middleware.push(logger)
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
    reducers,
    INITIAL_STATE,
    composedEnhancers
)

//process.env.NODE_ENV !== 'production'){

export default store