import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {isDev} from './env';
import {createRoot} from "react-dom/client";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {Provider} from 'react-redux';

import keycloak from './keycloak';
import {combineReducers} from 'redux';
import {storefrontsReducer} from "./storefronts/reducers";
import {User} from "./user/user";
import {StorefrontAction} from "./storefronts/actions";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {StorefrontState} from "./storefronts/Storefronts";

const container = document.getElementById('root');

export class RootState {
    storefronts?: StorefrontState;
    user?: User;
}

const rootReducer = combineReducers({
    storefronts: storefrontsReducer,
});

const store = configureStore( {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    preloadedState: {}
});

store.dispatch(StorefrontAction.loadStorefronts())

const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <ReactKeycloakProvider authClient={keycloak} initOptions={{onLoad: ''}}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ReactKeycloakProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if (isDev()) {
    reportWebVitals(console.log);
}