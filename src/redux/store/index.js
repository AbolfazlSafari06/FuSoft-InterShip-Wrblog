import { applyMiddleware, createStore, combineReducers } from "redux";
import { persistCombineReducers, persistStore } from "redux-persist";
import rootReducer from '../reducers';
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    blacklist: [],
};

const logger = createLogger();

const persistedCombinedReducers = persistCombineReducers(
    persistConfig,
    rootReducer()
);

let store = createStore(persistedCombinedReducers, applyMiddleware(thunk, logger));
let persistor = persistStore(store);
export { store, persistor };