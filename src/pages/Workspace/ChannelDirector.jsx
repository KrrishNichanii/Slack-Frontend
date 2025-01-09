import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspac'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function ChannelDirector() {
     const {currentWorkspace } =  useCurrentWorkspace() ; 
     const navigate = useNavigate() ; 
     
     useEffect(() => {
        if(currentWorkspace) navigate(`/workspaces/${currentWorkspace._id}/channels/${currentWorkspace?.channels[0]?._id}`)
     } ,[currentWorkspace])
    //  console.log('CW ' , currentWorkspace);
     
  return (
    <div>ChannelDirector</div>
  )
}

export default ChannelDirector