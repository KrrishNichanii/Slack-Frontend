import UserButton from '@/components/atoms/UserButton/UserButton'
import { Button } from '@/components/ui/button';
import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace'
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {AppSidebar} from '@/components/organisms/Home/Home.tsx'
import { SidebarProvider } from '@/components/ui/sidebar';
import { useGetRecentWorkspaces } from '@/hooks/apis/workspaces/useGetRecentWorkspaces';
import { Frame, Map } from 'lucide-react';
import { useAuth } from '@/hooks/context/useAuth';
import { FaProjectDiagram } from 'react-icons/fa';
import { AiOutlineHistory } from 'react-icons/ai';
import Hero from '@/components/organisms/Hero/Hero';

function Home() {
  const {setOpenCreateWorkspaceModal} = useCreateWorkspaceModal() ; 
  const { isFetching  ,workspaces , error ,isSuccess} = useFetchWorkspace() ;
  const {isFetching : isFetchingRecentWorkspaces , recentWorkspaces} = useGetRecentWorkspaces() ; 
  const { auth } = useAuth() ; 
  const [items , setItems] = useState([]) ;
  const {logout} = useAuth() ; 
   
  const navigate = useNavigate() ;
  

  useEffect(() => {
    setItems([
      {
        title : 'Workspaces' ,
        url:'#' ,
        icon: FaProjectDiagram ,
        isActive: true , 
        items: workspaces?.map((workspace) => ({title : workspace?.name , url:`workspaces/${workspace?._id}`})) ,
      } ,
  
      {
        title : 'Recent Workspaces' ,
        url:'#' ,
        icon: AiOutlineHistory ,
        isActive: true , 
        items: recentWorkspaces?.map((workspace) => ({title : workspace?.name , url:`workspaces/${workspace?._id}`})) ,
      } ,
    ])
    if(!isFetching && !isSuccess && error){
      if(error.status === 403){
          logout() ; 
          navigate('/auth/signin') ; 
      }
  }
  } ,[isSuccess , error , workspaces , recentWorkspaces])
   
  return (
    <>
      <SidebarProvider>
        <AppSidebar items={items}  />
        <Hero />
      </SidebarProvider>
    </>
  )
}

export default Home