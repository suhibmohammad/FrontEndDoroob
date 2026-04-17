import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider=({children})=>{
    const [userEmail,setUserEmail]=useState("")

    return(
        <AuthContext.Provider value={{userEmail,setUserEmail}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth =()=>useContext(AuthContext)