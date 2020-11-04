import React, { createContext, useContext, useState } from "react";
import { AppData } from "../types";
import { AppDataContext } from "../contexts";

type AppDataContextProviderProps = {
  initialState?: AppData;
  children: React.ReactNode;
};

export default function AppDataContextProvider(
  props: AppDataContextProviderProps
) {
  const [value] = useState<AppData>(() => {
    const propsInitialState = props.initialState;
    if (propsInitialState) return propsInitialState;
    if (typeof window !== "undefined") {
      const windowInitialState = window.INITIAL_STATE;
      if (windowInitialState !== undefined) {
        return windowInitialState;
      }
    }

    return {
      users: {},
      posts: {},
      comments: {},
      messages: {},
      channels: {},
    };
  });
  return (
    <AppDataContext.Provider value={value}>
      {props.children}
    </AppDataContext.Provider>
  );
}
