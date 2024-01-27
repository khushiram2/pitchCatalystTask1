import React, { useEffect, useState } from 'react'
import { AppContext } from './createContext'

export const ProvideContext = ({children}) => {
    const [login, setLogin] = useState(false)
    const [mySelectedContract, setMySelectedContract] = useState({})
    const [contracts,setContracts]=useState([])
    const [adminDetails,setAdmindetails]=useState({})
    const values={
        login,
        setLogin,
        mySelectedContract,
        setMySelectedContract,
        contracts,
        setContracts,
        adminDetails,
        setAdmindetails,
    }
  return (
    <AppContext.Provider value={values}>
{children}
    </AppContext.Provider>
  )
}
