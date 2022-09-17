import { createContext, useReducer } from "react";
import { ITodo } from "@/helpers";

const cache = JSON.parse(localStorage.getItem("todoCache") as any) || [];

const initialState = {
  apiUrl: "http://localhost:3000",
  todos: cache.todo || [],
  setTodos: (todos: ITodo[]) => {},
};

export const GlobalContext = createContext(initialState);

interface IReducerAction {
  type: string;
  payload: any;
}

type TReducerState = typeof initialState;

//* REDUCER - update state to payload based on action type passed in from dispatch
const reducers = (state: TReducerState, action: IReducerAction) => {
  switch (action.type) {
    case "SET_TODOS":
      const todos = action?.payload || [];
      localStorage.setItem("todoCache", JSON.stringify(state));

      return { ...state, todos };

    default:
      return { ...state };
  }
};

//* PROVIDER COMPONENT - wraps the entire app and provides access to the global state object
export const GlobalProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  //* ACTIONS
  const setTodos = (todos: ITodo[]): void => {
    dispatch({
      type: "SET_TODOS",
      payload: todos,
    });
  };

  const globalState = {
    //* STATE (getters)
    apiUrl: state.apiUrl,
    todos: state.todos,

    //* ACTIONS
    setTodos,
  };
  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};
