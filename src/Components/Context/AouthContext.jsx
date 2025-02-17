import React, { createContext, useEffect, useState } from 'react'

 export let aouthContext =createContext()

export default function AouthContextProvider({children}) {
    let [token,setToken]= useState(null)
    useEffect(()=>{    setToken(localStorage.getItem('token'))
})
  return (

<aouthContext.Provider value ={{token,setToken}}>

{children}
</aouthContext.Provider>

)
}
