import React, { createContext, Dispatch, useContext, useReducer, useState } from "react";
import { initialState, UserReducer } from "../reducers/UserReducer";
import { Barbers } from "../interface/Barbers";
import { BarberProfile } from "../interface/BarberProfile";

type Props = {
    children: React.ReactNode;
}

export const UserContext = createContext<{
    state: typeof initialState;
    dispatch: Dispatch<any>;
    setBarbersList: React.Dispatch<React.SetStateAction<never[]>>
    barbersList: Barbers[]
    barberInfo: BarberProfile | null
    setBarberInfo: React.Dispatch<React.SetStateAction<BarberProfile | null>>
    setList: React.Dispatch<React.SetStateAction<never[]>>
    list: never[]
    favoriteList: never[]
    setFavoriteList: React.Dispatch<React.SetStateAction<never[]>>
    appointmentsList: never[]
    setAppointmentsList: React.Dispatch<React.SetStateAction<never[]>>
}>({
    state: initialState,
    dispatch: () => null,
    setBarbersList: () => null,
    barbersList: [],
    barberInfo: null,
    setBarberInfo: () => null,
    setList: () => null,
    list: [],
    favoriteList: [],
    setFavoriteList: () => null,
    appointmentsList: [],
    setAppointmentsList: () => null
});

export function useUserContext() {
    return useContext(UserContext);
}

export function UserContextProvider ({ children }: Props) {
    const [state, dispatch] = useReducer(UserReducer, initialState);
    const [barbersList, setBarbersList] = useState([]);
    const [barberInfo, setBarberInfo] = useState<BarberProfile | null>(null);
    const [list, setList] = useState([])
    const [favoriteList, setFavoriteList] = useState([])
    const [appointmentsList, setAppointmentsList] = useState([])

    const context = {
        state,
        dispatch,
        barbersList, 
        setBarbersList,
        barberInfo,
        setBarberInfo,
        setList,
        list,
        favoriteList,
        setFavoriteList,
        appointmentsList,
        setAppointmentsList
    }

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    )
}