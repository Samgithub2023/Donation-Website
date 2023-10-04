/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getNgoData, getUserData } from "../firebase";
import useAuth from "../hooks/useAuth";

const Context = createContext()
export const useDataContext = () => useContext(Context);

const ContextProvider = props => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, ngo } = useAuth()
    const notLogged = ['/', '/user/signup', '/user/login', '/ngo/signup', '/ngo/login', '/ngos', '/ngo/id/:uid']
    const userLogged = ['/user', '/user/profile', '/ngo/id/:uid', '/user/donate', '/user/donations', '/user/money', '/ngos']
    const ngoLogged = ['/ngo', '/ngo/profile', '/ngo/id/:uid', '/ngos', '/ngo/dashboard', '/ngo/dashmore']
    const [userData, setUserData] = useState()
    const [ngoData, setNgoData] = useState()
    const [userDataUpdated, setUserDataUpdated] = useState(true)
    const [ngoDataUpdated, setNgoDataUpdated] = useState(true)

    useEffect(() => {
        if (!user || !userDataUpdated) return
        getUserData(user).then(({ success, data }) => {
            if (success) {
                setUserData(data)
                setUserDataUpdated(false)
            }
        })
    }, [user])

    useEffect(() => {
        if (!ngo || !ngoDataUpdated) return
        getNgoData(ngo).then(({ success, data }) => {
            if (success) {
                setNgoData(data)
                setNgoDataUpdated(false)
            }
        })
    }, [ngo])

    useEffect(() => {
        const path = location.pathname
        if (user) { if (!userLogged.includes(path)) navigate('/user') }
        else if (ngo) { if (!ngoLogged.includes(path)) navigate('/ngo') }
        else if (user === null && ngo === null) { if (!notLogged.includes(path)) navigate('/') }
    }, [user, ngo, location.pathname])

    return <Context.Provider value={{ userData, ngoData, setUserDataUpdated, setNgoDataUpdated }}>
        {props.children}
    </Context.Provider>
}

export default ContextProvider;