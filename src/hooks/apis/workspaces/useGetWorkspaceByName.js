import { getWorkspaceByNameRequest } from "@/apis/workspaces"
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query"

export const useGetWorkspaceByName = ({workspaceName}) => {

    const { auth } = useAuth() ; 

    const {isFetching , isError , error , data: workspace} = useQuery({
        queryFn: () => getWorkspaceByNameRequest({workspaceName , token: auth?.token}) , 
        queryKey: [`workspaceByName-${workspaceName}`]
    })

    return {
        isFetching , 
        isError , 
        error , 
        workspace , 
    }
}