import { useContext } from "react";
import { AppContext } from "./createContext";

export const useAppContext=()=>useContext(AppContext)