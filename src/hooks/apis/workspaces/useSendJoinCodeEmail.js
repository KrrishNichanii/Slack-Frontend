import { sendJoinCodeEmailRequest } from "@/apis/workspaces"
import { useAuth } from "@/hooks/context/useAuth"
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query"

export const useSendJoinCodeEmail = () => {
    const { auth } = useAuth() ; 
    const { toast } = useToast() ; 

    const {isPending , isError , isSuccess , mutateAsync: sendJoinCodeEmailMutation} = useMutation({
        mutationFn: ({email , workspaceName , joinCode}) => sendJoinCodeEmailRequest({email , workspaceName , joinCode , token: auth?.token}) , 
        onSuccess: () => {
            console.log('Sent join  code email successfully');
            toast({
                title: 'Email sent successfully' , 
                type: 'success'
            })
        } ,
        onError: (error) => {
            console.log('Error in sending  join code email', error);
            toast({
                title: error?.message , 
                type: 'error'
            })
        }
    }) ; 

    return {
        sendJoinCodeEmailMutation , 
        isPending , 
        isError , 
        isSuccess , 
    }
}