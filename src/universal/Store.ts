import { applyMiddleware, createStore as createReduxStore, Action } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

import { IState } from "../universal/models/state";
import reducers from "./reducers";

const loggerMiddleware = createLogger({
  level: "info"
});

export default function createStore(preloadedState?: IState) {
  return preloadedState
    ? createReduxStore<IState, Action<any>, {}, {}>(
        reducers,
        preloadedState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
      )
    : createReduxStore<IState, Action<any>, {}, {}>(
        reducers,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
      );
}
