import { getDirectMessageChannelIdRequest } from '@/apis/channels';
import { useGetDirectMessageChannelId } from '@/hooks/apis/channels/useGetDirectMessageChannelId';
import { useAuth } from '@/hooks/context/useAuth';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function DirectMessages() {

    const {workspaceId , memberId} = useParams() ; 
    const {isFetching , channelId : directMessageChannelId} = useGetDirectMessageChannelId({receiverId: memberId , workspaceId}) ; 
    const navigate = useNavigate() ; 

    useEffect(() => {
        
        console.log('DM Ch ',directMessageChannelId);
        
        if(directMessageChannelId){
           navigate(`/workspaces/${workspaceId}/channels/${directMessageChannelId}`, 
            { state: {
               receiverId : memberId , 
            }
            }) ; 
        }

    } , [directMessageChannelId , isFetching]) ;

  return (
    <div className="">
      <Loader2 className='animate-spin size-4' />
    </div>
  )
}

export default DirectMessages