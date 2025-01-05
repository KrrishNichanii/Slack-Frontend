import React, { createContext, useState } from 'react'

const ChannelMessagesContext = createContext() ;

export default ChannelMessagesContext ; 

export function ChannelMessagesProvider({children}) {
   
  const [messageList , setMessageList] = useState([]) ; 

  
  return (
    <ChannelMessagesContext.Provider value={{messageList , setMessageList}}>
      {children}
    </ChannelMessagesContext.Provider>
  )
}
