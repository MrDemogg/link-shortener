import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {linkApi} from "../service/LinkService";

const rootReducer = combineReducers({
  [linkApi.reducerPath]: linkApi.reducer
})

export const setupStore = (): any => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(linkApi.middleware)
  })
}