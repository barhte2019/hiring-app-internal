import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createBrowserHistory} from 'history';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {reducer as form} from 'redux-form';
import {systemReducer} from './system/reducers';
import {jobsReducer} from './jobs/reducers';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    form,
    jobs: jobsReducer,
    router: connectRouter(history),
    system: systemReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware, routerMiddleware(history)];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middlewareEnhancer)
    );

    return store;
}