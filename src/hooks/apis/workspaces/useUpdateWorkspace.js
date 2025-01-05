import { updateWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

 
 
 const useUpdateWorkspace = (workspaceId) => {
     const { auth } = useAuth() ; 

     const {isPending , error , isSuccess , mutateAsync: updateWorkspaceMutation} = useMutation({
        mutationFn: (name , description) => updateWorkspaceRequest({workspaceId , name , description ,token: auth?.token}) ,
        onSuccess: () => {
            console.log('Workspace updated successfully ');
        } ,
        onError: (error) => {
            console.log('Error in updating workspace ',error);
            
        }
     }) ;

     return {
        isPending , 
        isSuccess , 
        error , 
        updateWorkspaceMutation , 
     }
 }

 export default useUpdateWorkspace ; 