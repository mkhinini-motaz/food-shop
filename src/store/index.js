import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from  'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import ReduxThunk from 'redux-thunk';

import reducers from './reducers'

export default function Store(props)
{
    const persistStoreConfig = {
        key: 'root',
        storage,
        whitelist: [ 'CartReducer', 'I18nReducer', 'AuthReducer' ],
    };

    const persistedReducer = persistReducer(persistStoreConfig, reducers);

    const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
    const persistor = persistStore(store);

    return (
        <PersistGate loading={null} persistor={persistor}>
            <Provider className="App" store={store}>
                {props.children}
            </Provider>
        </PersistGate>
    );
}
