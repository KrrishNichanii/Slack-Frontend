import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import useDeleteWorkspace from '@/hooks/apis/workspaces/useDeleteWorkspace';
import useUpdateWorkspace from '@/hooks/apis/workspaces/useUpdateWorkspace';
import useWorkspacePreferencesModal from '@/hooks/context/useWorkspacePreferencesModal';
import { useToast } from '@/hooks/use-toast';
import { useConfirm } from '@/hooks/useConfirm';
import { useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function WorkspacePreferencesModal() {
    const { initialValue , setInitialValue , openPreferences ,setOpenPreferences , workspace } = useWorkspacePreferencesModal() ; 
    const [workspaceId , setWorkspaceId] = useState('') ;
    const {deleteWorkspaceMutation} = useDeleteWorkspace(workspaceId) ; 
    const { toast } = useToast() ; 
    const navigate = useNavigate() ; 
    const queryClient = useQueryClient() ;
    const {confirmation , ConfirmDialog} = useConfirm({title: 'Do you want to delete the workspace?' , message: 'This action cannot be undone'})
    const {confirmation: updateConfirmation , ConfirmDialog: UpdateDialog} = useConfirm({title: 'Do you want to update the workspace?' , message: 'This action cannot be undone'})
    
    async function handleDelete() {
        if(renameValue == workspace?.name) return  ; 
       try {

        const ok = await confirmation() ; 

        if(!ok) return  ;

         await deleteWorkspaceMutation() ; 
         navigate('/home') ; 
         queryClient.invalidateQueries('fetchWorkspaces');
         setOpenPreferences(false) ; 
         toast({
            title: 'Workspace deleted successfully' ,
            type: 'Success'
         })
       } catch (error) {
           console.log('Error in deleting the workspace ',error);
           toast({
            title: 'Error in deleting workspace' ,
            type: 'error'
           })
       }
    }

    useEffect(() => {
           setWorkspaceId(workspace?._id) ; 
           setRenameValue(workspace?.name)
    } , [workspace]) ;

    const[renameValue , setRenameValue] = useState(workspace?.name) ;
    const [editOpen , setEditOpen] = useState(false) ; 
    const {isPending , updateWorkspaceMutation} = useUpdateWorkspace(workspaceId) ; 

    async function handleFormSubmit(e) {
        e.preventDefault() ; 
        // 
        try {
            const ok = await updateConfirmation()  ;
            if(!ok) return ;
            await updateWorkspaceMutation(renameValue);
            queryClient.invalidateQueries(`fetchWorkspaceById-${workspace?._id}`);
            setOpenPreferences(false);
            if(renameValue != workspace?.name)
            toast({
                title: 'Workspace updated successfully',
                type: 'success'
            });
        } catch(error) {
            console.log('Error in updating workspace', error);
            toast({
                title: 'Error in updating workspace',
                type: 'error'
            });
        }
    }
    return (
        <>
            <ConfirmDialog/>
            <UpdateDialog/>
            <Dialog open={openPreferences} onOpenChange={() => setOpenPreferences(false)} >
                <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
                    <DialogHeader className='p-4 border-b bg-white'>
                        <DialogTitle>
                            Edit Workspace
                        </DialogTitle>
                    </DialogHeader>

                    <div className="px-4 pb-4 flex flex-col gap-y-2">
                        <Dialog open={editOpen} onOpenChange={setEditOpen}>
                            <DialogTrigger>
                                    <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <p
                                                className='font-semibold text-sm '
                                            >
                                                Workspace Name
                                            </p>
                                            <p className='text-sm font-semibold hover:underline'>
                                                Edit
                                            </p>
                                        </div>

                                        <p
                                        className='text-sm'>
                                            {initialValue?.name}
                                        </p>
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Rename Workspace
                                    </DialogTitle>
                                </DialogHeader>
                                <form className='space-y-4' onSubmit={handleFormSubmit}>
                                    <Input
                                        value={renameValue}
                                        onChange = {(e) => setRenameValue(e.target.value)}
                                        required
                                        autoFocus
                                        minLength={3}
                                        maxLength={50}
                                        disabled = {isPending}
                                        placeholder="Workspace name e.g. Design Team"
                                    />
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button 
                                            variant='outline'
                                            disabled={isPending}
                                            >
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button
                                        type='submit'
                                        disabled={isPending}
                                        >
                                            Save
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>

                        <button 
                            className='flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border' 
                            onClick={handleDelete}
                        >
                            <TrashIcon className='size-5'/>
                            <p className='text-sm font-semibold'>Delete Workspace</p>
                        </button>
                    </div>

                </DialogContent>
            </Dialog>
        </>
  )
}

export default WorkspacePreferencesModal