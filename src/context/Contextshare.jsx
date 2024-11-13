import React, { createContext, useState } from 'react'

export const addResponseContext = createContext({})

export const editResponseContext = createContext({})

export const loginResponseContext=createContext({})

function Contextshare({ children }) {
    const [addResponse, setAddResponse] = useState([])
    const [editResponse, setEditResponse] = useState([])
    const [loginResponse,setLoginResponse]=useState(true)
    return (
        <>
            <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
                <editResponseContext.Provider value={{ editResponse, setEditResponse }}>
                    <loginResponseContext.Provider value={{loginResponse,setLoginResponse}}>
                    {children}
                    </loginResponseContext.Provider>
                </editResponseContext.Provider>
            </addResponseContext.Provider>
        </>
    )
}

export default Contextshare
