import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
import reducer from "./Reducer";
import saga from "./Saga";

const sagaMiddleware = createSagaMiddleware();
let store;
if (__DEV__) {
    store = createStore(reducer, applyMiddleware(sagaMiddleware,logger));

} else {
    store = createStore(reducer, applyMiddleware(sagaMiddleware));
}

sagaMiddleware.run(saga);

export default store;
