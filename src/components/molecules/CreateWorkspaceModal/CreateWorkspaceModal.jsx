import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "@/hooks/apis/workspaces/useCreateWorkspace";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal"
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateWorkspaceModal = () => {
    
    const {openCreateWorkspaceModal , setOpenCreateWorkspaceModal} = useCreateWorkspaceModal()
    const {isPending  , createWorkspaceMutation} = useCreateWorkspace() ; 
    const navigate  = useNavigate() ; 
    const queryClient = useQueryClient() ;

    const [workspaceName , setWorkspaceName] = useState('') ; 
    const [workspaceDescription , setWorkspaceDescription] = useState('') ; 


    function handleClose(){
         setOpenCreateWorkspaceModal(false)  ; 
    }

     
    async  function handleFormSubmit(e) {
        e.preventDefault() ; 
        try {
           const data = await createWorkspaceMutation({name: workspaceName , description: workspaceDescription}) ;
           console.log("Created new workspace ",data);
            
            navigate(`/workspaces/${data._id}`) ; 

            queryClient.invalidateQueries('fetchWorkspaces') ; 
        } catch (error) {
            console.log("Not able to create a new workspace ",error);
        }
        finally{
            setWorkspaceName("") ;
            setWorkspaceDescription("") ;
            setOpenCreateWorkspaceModal(false) ; 
        }
    }



    return (
        <Dialog
         open = {openCreateWorkspaceModal}
         onOpenChange={handleClose}
        >
           <DialogContent>
               <DialogHeader>
                  <DialogTitle>Create a new workspace</DialogTitle>
               </DialogHeader>

               <form onSubmit={handleFormSubmit} className="space-y-5">
                <Input
                   required 
                   minLength={3}
                   placeholder = "Put the workspace name e.g. MyWorkspace , Dev Workspace etc ..."
                   value={workspaceName}
                   onChange = {(e) => setWorkspaceName(e.target.value)}
                   disabled = {isPending}
                   
                />

                <Input
                   required 
                   minLength={3}
                   placeholder = "Workspace description"
                   value={workspaceDescription}
                   onChange = {(e) => setWorkspaceDescription(e.target.value)}
                   disabled = {isPending}
                />

                <div className="flex justify-end mt-5">
                    <Button disabled={isPending}>Create workspace</Button>
                </div>
               </form>
           </DialogContent>
        </Dialog>
    )
}