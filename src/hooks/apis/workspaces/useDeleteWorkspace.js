import { deleteWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

const useDeleteWorkspace = (workspaceId) => {
    const { auth } = useAuth() ; 
    const {isPending , error , isSuccess , mutateAsync:deleteWorkspaceMutation } = useMutation({
        mutationFn: () => deleteWorkspaceRequest({workspaceId , token: auth?.token})  ,
        onSuccess: () => {
            console.log('Workspace deleted successfully');
        } , 
        onError: (error) => {
            console.log('Error in deleting workspace ', error);
        }
    })


    return {
        isPending ,
        error , 
        isSuccess , 
        deleteWorkspaceMutation , 
    }
}

export default useDeleteWorkspace ; 