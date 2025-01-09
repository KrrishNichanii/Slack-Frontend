import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/useAuth"
import { getPresignedUrl } from "@/apis/s3";

export const useGetPresignedUrl = () => {
     const  {auth} = useAuth() ; 

     const {isFetching , isError , error , data} = useQuery({
        queryKey: ['getPresignedUrl'] , 
        queryFn: () => getPresignedUrl({ token: auth?.token})
     })  ;

     return {
        isFetching , 
        isError , 
        error , 
        data: url
     }
}