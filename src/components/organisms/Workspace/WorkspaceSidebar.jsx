import UserButton from '@/components/atoms/UserButton/UserButton'
import SidebarButton from '@/components/molecules/SidebarButton/SidebarButton'
import { BellIcon, HomeIcon, MessageSquareIcon, MoreHorizontalIcon } from 'lucide-react'
import React from 'react'
import WorkspaceSwitcher from '@/components/organisms/Workspace/WorkspaceSwitcher'
import { useNavigate, useParams } from 'react-router-dom'
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspac'

export default function WorkspaceSidebar() {
    const navigate = useNavigate() ; 
    const {workspaceId} = useParams() ; 
    
    
  return (
    <aside
     className='w-[70px] h-full bg-slack-dark flex flex-col gap-y-4 items-center pt-[10px] pb-[5px]'
    >
       <WorkspaceSwitcher />
       <SidebarButton 
           Icon={HomeIcon}
           label="Home" 
           handleClick={() => navigate('/home')} 
       />

       <SidebarButton 
           Icon={MessageSquareIcon}
           label="DMs"
        //    handleClick={() => {navigate(`/workspaces/${workspaceId}/direct-messages`)}}  
       />

       <SidebarButton 
           Icon={BellIcon}
           label="Notifications"  
       />

       <SidebarButton 
           Icon={MoreHorizontalIcon}
           label="More"  
       />


        <div className="flex flex-col items-center justify-center mt-auto gap-y-1 mb-5">
            <UserButton/>
        </div>

    </aside>
  )
}
