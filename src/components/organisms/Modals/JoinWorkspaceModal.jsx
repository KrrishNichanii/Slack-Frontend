import { getWorkspaceByNameRequest } from '@/apis/workspaces';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { useGetWorkspaceByName } from '@/hooks/apis/workspaces/useGetWorkspaceByName';
import { useAuth } from '@/hooks/context/useAuth';
import { useJoinWorkspaceModal } from '@/hooks/context/useJoinWorkspaceModal';
import { useToast } from '@/hooks/use-toast';

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function JoinWorkspaceModal() {

   const {openJoinWorkspace , setOpenJoinWorkspace} =  useJoinWorkspaceModal() ;
   const [workspaceName , setWorkspaceName] = useState('') ;
   const { auth } = useAuth() ; 
   const { toast } = useToast() ; 
   const navigate = useNavigate() ; 

   async function  handleSubmit(e){
    e.preventDefault();

    if(workspaceName.trim()){
        try {
         const response =    await getWorkspaceByNameRequest({workspaceName , token : auth?.token}) ; 
         console.log('R ' , response);
         setOpenJoinWorkspace(false) ; 
         navigate(`/workspaces/join/${response?._id}`)
        } catch (error) {
            console.log('Error in fetching workspace by name ',error);
            toast({
                title: error?.message , 
                type: 'error' , 
            })
        }        
        setWorkspaceName('');
        
    }
   }


  return (
    <Dialog open={openJoinWorkspace} onOpenChange={setOpenJoinWorkspace} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Enter name of the  workspace you want to join
                    </DialogTitle>
                    <DialogDescription>
                        <form 
                        onSubmit={handleSubmit}
                         className='flex flex-col items-center gap-4'
                        >
                                <Input 
                                 value= {workspaceName}
                                placeholder='Workspace name'
                                onChange = {(e) => setWorkspaceName(e.target.value)}
                                className='text-black'
                                />
                                <Button  type='submit'>
                                    Submit
                                </Button>
                        </form>
                    </DialogDescription>
                </DialogHeader>


            </DialogContent>
        </Dialog>
  )
}

export default JoinWorkspaceModal