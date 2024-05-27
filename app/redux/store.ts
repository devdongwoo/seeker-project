import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import userReducer from "./features/user"
import bookmarkReducer from "./features/bookmark"

const reducers = combineReducers({
  user: userReducer,
  bookmark: bookmarkReducer
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "bookmark"]
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: { persistedReducer },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
