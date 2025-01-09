import { getRecentWorkspaces } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from  "@tanstack/react-query" ; 

export const useGetRecentWorkspaces = () => {
    const { auth } = useAuth()
   const {isFetching , isError , error , data: recentWorkspaces} =  useQuery({
        queryFn:() =>  getRecentWorkspaces({token : auth?.token}) , 
        queryKey: ['recentWorkspaces'] , 
    }) ; 


    return {
        isFetching , 
        isError , 
        error , 
        recentWorkspaces , 
    }
}