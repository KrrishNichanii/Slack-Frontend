import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';
import { Loader } from 'lucide-react';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function WorkspaceSwitcher() {

  const navigate = useNavigate() ;
  const { workspaceId } = useParams() ; 

  const {isFetching , workspace} = useGetWorkspaceById(workspaceId) ; 
  const { workspaces , isFetching: isFetchingWorkspace} = useFetchWorkspace() ; 
// console.log("Workspaces ",workspaces);

  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button
              className="size-9 relative overflow-hidden bg-[#ababad] hover:bg-[#ababad]/80 font-semibold text-slate-800 text-xl"
            >
                {isFetching ? (<Loader className='size-5 animate-spin' />) : workspace?.name[0].toUpperCase()}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
               <DropdownMenuItem className='cursor-pointer flex-col justify-start items-start'>
                     {workspace?.name}
                     <span className='text-xs text-muted-foreground'>(Active Workspace)</span>
                </DropdownMenuItem>
                {
                    
                    isFetchingWorkspace ? (<Loader className='size-5 animate-spin'/>) :(
                        workspaces?.map((workspace) => { 
                            if(workspace._id === workspaceId)  ;
                            else {
                                return (
                                    <DropdownMenuItem 
                                        className='cursor-pointer flex-col justify-start items-start'
                                        key={workspace._id} 
                                        onClick={() => navigate(`/workspaces/${workspace._id}`)}
                                    >
                                    <p className='truncate'> {workspace.name} </p>   
                                    </DropdownMenuItem>

                                )
                            }
                            })
                    )
                }

            
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default WorkspaceSwitcher