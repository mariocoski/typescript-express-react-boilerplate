import { IState } from "../models";

declare global {
  interface Window {
    main: () => void;
    __INITIAL_STATE__: IState;
  }
}
