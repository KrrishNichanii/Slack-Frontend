import { joinWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query";

export const useJoinWorkspace = (workspaceId) => {
    const { auth } = useAuth() ; 

    const {mutateAsync: joinWorkspaceMutation , isSuccess , isPending , error } = useMutation({
        mutationFn: (joinCode) => joinWorkspaceRequest({workspaceId , joinCode , token: auth?.token}) , 
        onSuccess: () => {
            console.log('Workspace joined successfully');
        } , 
        onError: () => {
            console.log('Error in joining workspace ',error); 
        }
    })


    return {
        joinWorkspaceMutation , 
        error , 
        isPending , 
        isSuccess , 
    }
}