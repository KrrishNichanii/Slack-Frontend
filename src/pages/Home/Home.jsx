import UserButton from '@/components/atoms/UserButton/UserButton'
import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace'
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const {setOpenCreateWorkspaceModal} = useCreateWorkspaceModal() ; 
  const { isFetching  ,workspaces } = useFetchWorkspace() ; 
  const navigate = useNavigate() ; 
  useEffect(() => {
    if(isFetching) return  ;
    console.log('Workspaces downloaded is  ',workspaces);
    
    if(!workspaces || workspaces.length === 0){
      console.log('No workspaces found , create or join one ');
      setOpenCreateWorkspaceModal(true) ; 
    } else{
        navigate(`/workspaces/${workspaces[0]._id}`) ; 
    }

  } ,[isFetching , workspaces , navigate]) ; 

  return (
    <>
      <div>Home</div>
      <UserButton/>
    </>
  )
}

export default Home