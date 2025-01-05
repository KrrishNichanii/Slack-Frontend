import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/context/useAuth'
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';
import { useToast } from '@/hooks/use-toast';
import { LogOutIcon, PencilIcon, SettingsIcon } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function UserButton() {
  const { toast } = useToast() ; 
  const navigate = useNavigate() ; 
  const {auth , logout} = useAuth() ; 
  async function handleLogout() {
        await logout() ; 
        toast({
            title: 'Successfully signed out' ,
            type: 'success' , 
        }) ;

        navigate('/auth/signin')
  }
  
  const  { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal() ; 
  function openWorkspaceCreateModal() {
      setOpenCreateWorkspaceModal(true) ; 
  }



  return (
    <DropdownMenu>
        <DropdownMenuTrigger className='outline-none relative'>
            <Avatar className="size-10 hover:opacity-65 transtion">
                <AvatarImage src={auth?.user?.avatar} />
                <AvatarFallback>
                    {auth?.user?.username[0].toUpperCase()}
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
              <DropdownMenuItem onClick={openWorkspaceCreateModal}>
                <PencilIcon className='size-4 mr-2 h-10'/>
                 Create Workspace
              </DropdownMenuItem>
              <DropdownMenuItem>
                 <SettingsIcon className='size-4 mr-2 h-10'/>
                 Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                 <LogOutIcon className='size-4 mr-2 h-10'/>
                 Logout
              </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton