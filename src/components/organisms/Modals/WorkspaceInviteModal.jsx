import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useResetJoinCode } from "@/hooks/apis/workspaces/useResetJoinCode"
import { useSendJoinCodeEmail } from "@/hooks/apis/workspaces/useSendJoinCodeEmail"
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspac"
import { useToast } from "@/hooks/use-toast"
import { CopyIcon, LogIn, RefreshCcwIcon } from "lucide-react"
import { useState } from "react"

export const WorkspaceInviteModal = ({ workspaceName , workspaceId , joinCode ,openInviteModal , setOpenInviteModal}) => {
    const { toast } = useToast() ; 
    const {isPending : isResetPending , resetJoinCodeMutation} = useResetJoinCode(workspaceId) ; 
    const [email , setEmail] = useState('') ;  

    const {isPending , isSuccess , sendJoinCodeEmailMutation} = useSendJoinCodeEmail() ; 

    async function handleCopy(e) {
        
        const inviteLink = `${joinCode}`
        await navigator.clipboard.writeText(inviteLink) ;
        
        toast({
            title: 'Link copied' , 
            type: 'success'
        })
    }
    
    async function handleResetCode() {
        try {
            await resetJoinCodeMutation() ; 
            setOpenInviteModal(false) ; 
            toast({
                title: 'Join code reset successfully' , 
                type: 'success'
            })
        } catch (error) {
            console.log('Error resettting join code ',error);
            
        }
    }
    
    async function handleSubmit(e) {
        e.preventDefault() ; 
        console.log('Sending email ' , email);
        await  sendJoinCodeEmailMutation({workspaceName , joinCode , email}) ;
        
        if(!isPending){
            setEmail('') ; 
            
            setOpenInviteModal(false) ; 
        }
    }

    return (
        <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Invite people to  {workspaceName}
                    </DialogTitle>
                    <DialogDescription>
                        Use the code shown below to invite people to your workspace
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center py-10 gap-y-4">
                    <p className="font-bold text-4xl uppercase">
                        {joinCode}
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4 w-[100%] flex flex-col items-center">
                        <Input
                            required 
                            minLength={3}
                            placeholder = "Put email of user you want to invite"
                            value={email}
                            onChange = {(e) => setEmail(e.target.value)}
                            className='w-[50%]'
                            type='email'
                            disabled = {isPending}
                            />
                        <Button type='submit' size='sm' variant='outline' disabled={isPending}>
                            Send email 
                        </Button>
                    </form>
                </div>

                <div className="flex  items-center justify-center w-full">
                    <Button disabled={isPending}  variant='outline' onClick={handleResetCode}>
                           Reset Join Code 
                          <RefreshCcwIcon className="size-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}