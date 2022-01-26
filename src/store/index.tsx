import { createContext, useReducer } from "react";

export const StoreStateContext = createContext({ zIndex: 0 });
export const StoreDispatchContext = createContext((...args: any[]) => {});

const reducer = (states: any, newStates: any) => {
  return { ...states, ...newStates };
};

const Store = (props: any) => {
  // 全局共享状态
  const [states, dispatch] = useReducer(reducer, {
    zIndex: 999,
  });

  return (
    <>
      <StoreStateContext.Provider value={states}>
        <StoreDispatchContext.Provider value={dispatch}>
          {props.children}
        </StoreDispatchContext.Provider>
      </StoreStateContext.Provider>
    </>
  );
};

export default Store;
