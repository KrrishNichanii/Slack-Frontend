import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query";

export const useGetUserById = () => {
    const { auth } = useAuth() ; 

    useQuery({
        queryFn: () => 
    })
}