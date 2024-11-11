import React, { createContext, useState } from 'react'

export const addResponseContext = createContext({})

function Contextshare({children}) {
    const [addResponse, setAddResponse] = useState([])
    return (
        <>
            <addResponseContext.Provider value={{addResponse,setAddResponse}}>
                {children}
            </addResponseContext.Provider>
        </>
    )
}

export default Contextshare
