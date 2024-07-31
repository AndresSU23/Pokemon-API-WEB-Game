import { createContext, useContext, useEffect, useReducer, useCallback, useState } from "react";
import { fetcher } from "@/utils/fetch";
import useSWR from "swr";
import { useAuth } from "./authContext";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {

    return (
        <MenuContext.Provider value={context}>
            { children }
        </MenuContext.Provider>
    )

}

