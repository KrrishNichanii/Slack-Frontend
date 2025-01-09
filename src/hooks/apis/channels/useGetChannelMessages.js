import { getPaginatedMessages } from "@/apis/channels"
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query"

export const useGetChannelMessages =  (channelId) => {
    const { auth } = useAuth() ; 
    const  {isFetching , isError , error, data, isSuccess } = useQuery({
        queryFn: () => getPaginatedMessages({token: auth?.token , channelId , limit: 10 , offset: 0}) ,
        queryKey: [`getPaginatedMessages`] ,  
        cacheTime: 0 , 
    }) ; 
    //  console.log('Channel messages ',data);
     
    return {
        isFetching,
        isError,
        error,
        messages: data,
        isSuccess
    };
}