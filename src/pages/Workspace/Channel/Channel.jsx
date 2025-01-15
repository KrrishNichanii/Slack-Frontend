import { getUserByIdRequest } from '@/apis/users';
import ChannelHeader from '@/components/molecules/Channel/ChannelHeader';
import ChatInput from '@/components/molecules/ChatInput/ChatInput';
import Message from '@/components/molecules/Message/Message';
import { useGetChannelById } from '@/hooks/apis/channels/useGetChannelById';
import { useGetChannelMessages } from '@/hooks/apis/channels/useGetChannelMessages';
import { useAuth } from '@/hooks/context/useAuth';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { useSocket } from '@/hooks/context/useSocket';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

function Channel() {
    const { channelId } = useParams() ; 
    const {channelDetails , isFetching , isError} = useGetChannelById(channelId) ; 
    const {joinChannel} = useSocket() ; 
    const queryClient = useQueryClient() ; 
    const messageContainerListRef = useRef(null) ; 
    
    const [dmName , setDmName] = useState('') ; 
    const location = useLocation() ; 
    // const { receiverId } = location?.state ; 
    const { auth } = useAuth() ; 

    useEffect(() => {
      async function getUser() {
        const receiver = await getUserByIdRequest({userId: location?.state?.receiverId , token: auth?.token}) ;
        setDmName(receiver?.username)
      }
      
      if(location?.state?.receiverId){
        getUser() ; 
      }
    } ,[location.state])
    
    const {messages , isSuccess , isError: isMessageError , isFetching: isMessageFetching} = useGetChannelMessages(channelId) ; 
    const {setMessageList , messageList} = useChannelMessages() ;
    useEffect(() => {
      if(messageContainerListRef.current)
      messageContainerListRef.current.scrollTop = messageContainerListRef.current.scrollHeight;
    } , [messageList]) ; 
    
    useEffect(() => {
      queryClient.invalidateQueries('getPaginatedMessages') ; 
    } ,[channelId]) ;

    useEffect(() => {
        if(!isFetching && !isError){
               joinChannel(channelId) ; 
        }
    } ,[isFetching , isError , joinChannel , channelId])
   
    useEffect(() => {
         if(isSuccess){
          console.log('Channel messages fetched');
          setMessageList(messages) ; 
         }
    } ,[isSuccess , messages , setMessageList]) ; 
    
    
    if(isFetching){
      return (
        <div className="h-full flex-1 flex items-center justify-center">
          <Loader2Icon className='size-5 animate-spin text-muted-foreground' />
        </div>
      )
    }
    if(isError){
      return (
        <div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
          <TriangleAlertIcon className='size-6 text-muted-foreground' />
          <span className='text-sm text-muted-foreground'>Channel Not found</span>
        </div>  
      )
    }
    
      return (
    <div className='flex flex-col h-full'>
        <ChannelHeader name={location?.state?.receiverId ?  `${dmName}${'/'}}` : channelDetails?.name} />
         <div ref={messageContainerListRef} className="flex-5 overflow-y-auto p-5 gap-y-2">
            {messageList?.map((message) => {
                return <Message
                          key={message._id} 
                          body={message.body}
                          authorImage={message?.senderId?.avatar}
                          authorName={message?.senderId?.username}
                          createdAt={message?.createdAt}
                          image={message?.image}
                        />
            })}   
         </div>
        <div className="flex-1" />
        <ChatInput/>

    </div>
  )
}

export default Channel