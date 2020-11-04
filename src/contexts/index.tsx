import { createContext } from "react";
import { AppData, FormStatus, FormState } from "../types";

export const AppDataContext = createContext<AppData>({
  users: {},
  posts: {},
  comments: {},
  messages: {},
  channels: {},
});

export const FormContext = createContext<FormState>({
  values: {},
  status: FormStatus.INITIAL,
});
