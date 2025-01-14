import { getDirectMessageChannelIdRequest } from "@/apis/channels";
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query";

export const useGetDirectMessageChannelId = ({receiverId , workspaceId}) => {
           const { auth } = useAuth() ; 
           
          const {isFetching , isSuccess , error , data: channelId} =  useQuery({
            queryFn: () => getDirectMessageChannelIdRequest({receiverId , workspaceId ,token: auth?.token}) , 
            queryKey: [`fetchDirectMessageChannelId-${receiverId}-${auth?.user?._id}`]
           }) ; 

           return {
            isFetching , 
            isSuccess , 
            error , 
            channelId ,
           }
}