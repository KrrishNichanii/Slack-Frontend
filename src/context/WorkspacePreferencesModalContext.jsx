import React, { createContext, useState } from 'react'

const WorkspacePreferencesModalContext = createContext() ; 
export default WorkspacePreferencesModalContext

export const  WorkspacePreferencesModalContextProvider = function ({children}) {
  
    const [openPreferences , setOpenPreferences] = useState(false) ; 
    const [initialValue , setInitialValue] = useState({
      name: '' , 
      description: ''
    }) ; 
  
    const [workspace , setWorkspace] = useState(null) ; 

  return (
    <WorkspacePreferencesModalContext.Provider value={{openPreferences , setOpenPreferences , initialValue , setInitialValue , workspace , setWorkspace}}>
        {children}
    </WorkspacePreferencesModalContext.Provider>
  )
}

