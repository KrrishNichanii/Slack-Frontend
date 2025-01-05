import { addMemberToWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query";

export const useAddMemberToWorkspace = (workspaceId) => {
     const { auth } = useAuth() ; 

     const {isPending , isSuccess , error , mutateAsync: addMemberToWorkspaceMutation} = useMutation({
        mutationFn: () => addMemberToWorkspaceRequest({token: auth?.token , workspaceId})  ,
        onSuccess: () => {
            console.log('Member added to workspace successfully');
        } , 
        onError: (error) => {
            console.log('Error in adding member to workspace ', error);
        }
     })

     return {
        addMemberToWorkspaceMutation ,
        isPending , 
        isSuccess , 
        error , 
     }
}