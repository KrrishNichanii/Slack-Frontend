import Editor from '@/components/atoms/Editor/Editor'
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspac';
import { useSocket } from '@/hooks/context/useSocket'
import React from 'react'

function ChatInput() {
  const {socket , currentChannel} = useSocket() ; 
  const { auth } = useAuth() ; 
  const { currentWorkspace } = useCurrentWorkspace() ;; 
  async function handleSubmit({ body }) {
    // console.log('Chat Input ' , body);
    socket?.emit('NewMessage' , {
      channelId: currentChannel ,
      body: body , 
      senderId: auth?.user?._id , 
      workspaceId: currentWorkspace?._id
    },(data) => {
      console.log('Message sent ',data);
      
    })
  }

  return (
    <div
      className='px-5 w-full'
    >
        <Editor 
           placeholder="Type a message"
           onSubmit={handleSubmit}
           onCancel={() => {}}
           disabled={false}
           defaultValue=""
        />
    </div>
  )
}

export default ChatInput