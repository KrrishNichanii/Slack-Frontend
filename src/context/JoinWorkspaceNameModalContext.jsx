import React, { createContext, useState } from 'react'

const JoinWorkspaceNameModalContext = createContext() ; 
export default JoinWorkspaceNameModalContext

export const  JoinWorkspaceNameModalContextProvider = function ({children}) {
  
    const [openJoinWorkspace , setOpenJoinWorkspace] = useState(false) ; 

  return (
    <JoinWorkspaceNameModalContext.Provider value={{openJoinWorkspace , setOpenJoinWorkspace}}>
        {children}
    </JoinWorkspaceNameModalContext.Provider>
  )
}