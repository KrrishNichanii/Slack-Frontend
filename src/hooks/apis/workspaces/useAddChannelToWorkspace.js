import { addChannelToWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query";

export const useAddChannelToWorkspace = () => {
    const { auth } = useAuth() ; 
    const {isPending , error , isSuccess , mutateAsync: addChannelToWorkspaceMutation } = useMutation({
        mutationFn: ({workspaceId , channelName}) => addChannelToWorkspaceRequest({workspaceId , token: auth?.token , channelName}) ,
        onSuccess: (data) => {
            console.log('Channel added to workspace ', data);
        }  , 
        onError: (error) => {
            console.log('Error adding channel to workspace ', error);
        }
    })

    return {
        isPending , 
        addChannelToWorkspaceMutation ,
        error , 
        isSuccess , 
    }
}