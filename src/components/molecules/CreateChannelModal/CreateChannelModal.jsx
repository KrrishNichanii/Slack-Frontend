import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddChannelToWorkspace } from "@/hooks/apis/workspaces/useAddChannelToWorkspace";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal"
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspac";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { useParams } from "react-router-dom";

export const CreateChannelModal = () => {
    const {openCreateChannelModal , setOpenCreateChannelModal} = useCreateChannelModal() ; 
    const [channelName , setChannelName] = useState('') ;
    const {isPending , isSuccess , addChannelToWorkspaceMutation} = useAddChannelToWorkspace() ; 
    const { toast } = useToast() ; 

    const queryClient = useQueryClient() ; 
    const { currentWorkspace }  = useCurrentWorkspace() ; 

    function handleClose() {
        setOpenCreateChannelModal(false) ; 
    }

    async function handleFormSubmit(e){
        e.preventDefault() ;
        // console.log('Current ',currentWorkspace);
        
        await addChannelToWorkspaceMutation({workspaceId: currentWorkspace?._id , channelName}) ; 
        // console.log('WorkspaceId ',add);
        
        toast({
            title: 'Channel created successfully' , 
            type: 'success' , 
        })
        setChannelName('') ; 
        queryClient.invalidateQueries(`fetchWorkspaceById-${currentWorkspace?._id}`) ;
        handleClose() ; 
    }


    return (
        <Dialog 
             open={openCreateChannelModal}
             onOpenChange={handleClose}
        >
           
           <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create a channel
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleFormSubmit}>
                    <Input
                        
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        minLength={3}
                        placeholder='Channel name e.g. team-announcements'
                        required
                        disabled={isPending}
                    />

                    <div className="flex justify-end mt-4">
                        <Button disabled={isPending}>
                            Create Channel
                        </Button>
                    </div>
                </form>
           </DialogContent>
        </Dialog>
    )
}