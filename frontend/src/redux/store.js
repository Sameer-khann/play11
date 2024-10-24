// src/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"; // Import your auth slice
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Persist configuration
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

// Combine reducers for future extensibility
const rootReducer = combineReducers({
    auth: authSlice, // Add authSlice to the root reducer
});

// Apply persist reducer to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with middleware to handle serializable checks
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

// Export store and persistor separately
export { store, persistor };
