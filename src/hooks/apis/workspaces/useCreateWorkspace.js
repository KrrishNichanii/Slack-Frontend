import { createWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query";

export const useCreateWorkspace = () => {
    const { auth } = useAuth() ; 

    const {isPending , isSucces , error , mutateAsync: createWorkspaceMutation} = useMutation({
        mutationFn: (data) => createWorkspaceRequest({...data , token: auth?.token})  ,
        onSuccess: (data) => {
             console.log('Successfully created workspace ',data);
             
        } ,
        onError: (error) => {
            console.log('Failed to create workspace ',error);
        }
    }) ; 

    return {
        isPending , 
        isSucces ,
        error , 
        createWorkspaceMutation
    }
}