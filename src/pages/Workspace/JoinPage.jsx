import { Button } from '@/components/ui/button';
import { useJoinWorkspace } from '@/hooks/apis/workspaces/useJoinWorkspace';
import { useToast } from '@/hooks/use-toast';
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import VerificationInput from 'react-verification-input';

function JoinPage() {
    const { workspaceId } = useParams() ; 

    const {joinWorkspaceMutation , isPending} = useJoinWorkspace(workspaceId) ; 
    const navigate = useNavigate() ; 
    const { toast } = useToast() ; 

    async function handleAddMemberToWorkspace(joinCode) {
        try {
             await joinWorkspaceMutation(joinCode) ; 

             toast({
                title: 'You have been added to workspace successfully' ,
                type: 'success'
             }) ; 

             navigate(`/workspaces/${workspaceId}`) ; 
        } catch (error) {
            console.log('Error adding member to workspace ',error);
            toast({
                title: error?.message , 
                variant: "destructive",
            })
        }
        
    }


  return (
    <div
      className='h-[100vh] flex flex-col gap-y-8 items-center justify-center p-8 bg-white rounded-lg shadow-sm'
    >
        <div className="flex flex-col gap-y-4 items-center justify-center">
             <div className="flex flex-col gap-y-2 items-center justify-center">
                <h1 className='font-bold text-4xl'>
                    Join Workspace
                </h1>

                <p>
                    Enter the code you received to join the workspace
                </p>
             </div>

        <VerificationInput 
           onComplete={handleAddMemberToWorkspace}
           length={6}
           classNames={{
            container: 'flex gap-x-2' ,
            character: 'h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' ,
            characterInactive: 'bg-muted' ,
            characterFilled:'bg-white text-black' ,
            characterSelected: 'bg-white text-black'
           }}
           autoFocus
           disabled={isPending}
        />
        </div>

        <div className="flex gap-x-4">
            <Button 
               size='lg' 
               variant='outline'
               disabled={isPending}
            >
                  <Link to={`/home`}>
                     Back to Home
                  </Link>
            </Button>
        </div>
    </div>
  )
}

export default JoinPage