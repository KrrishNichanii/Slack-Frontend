import { Button } from '@/components/ui/button';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspac';
import { InfoIcon, LucideLoader2, SearchIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate, useParams ,  } from 'react-router-dom'

function WorkspaceNavbar() {
    const {workspaceId} = useParams() ; 
    const{isFetching ,  workspace , isSuccess , error } = useGetWorkspaceById(workspaceId) ; 
    const { setCurrentWorkspace} = useCurrentWorkspace() ; 
    const navigate = useNavigate() ; 
    const {logout} = useAuth() ; 
    useEffect(() => { 
        if(workspace) setCurrentWorkspace(workspace) ;

        if(!isFetching && !isSuccess && error){
            if(error.status === 403){
                logout() ; 
                navigate('/auth/signin') ; 
            }
        }
        // console.log('WW ',workspace);
        
    } , [workspace , setCurrentWorkspace , isSuccess , error]) ; 

    
    if(isFetching){
        return <LucideLoader2 className='animate-spin ml-2' />
    }

    


    return (
       <nav className='flex items-center justify-center h-10 p-1.5 bg-slack-dark'>
               <div className="flex-1 text-white font-semibold ml-4">
                    {/* Logo can come here */}
                     LOGO
               </div>
               <div className="">
                    <Button 
                    size='sm'
                    className="bg-accent/25 hover:bg-accent/15 w-full justify-start h-7 px-2"
                    >
                        <SearchIcon className='size-5 text-white mr-2'/>
                        <span className='text-white text-sm'>
                            Search {workspace?.name || 'Workspace'}
                        </span>
                    </Button>
               </div>

               <div className="ml-auto flex-1 flex items-center justify-end">
                <Button
                   variant="transparent"
                   size="sm"
                >
                    <InfoIcon className='size-5 text-white' />
                </Button>
               </div>
       </nav>
  )
}

export default WorkspaceNavbar