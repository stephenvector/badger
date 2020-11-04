import { useContext } from "react";
import { AppDataContext } from "../contexts";

export function useAppDataContext() {
  return useContext(AppDataContext);
}
