import { useAuth } from "@/hooks/context/useAuth"
import axios from '@/config/axiosConfig' ;

export const getUserByIdRequest = async ({userId , token}) => {
  
    try {
       const response = await axios.get(`/users/${userId}` , {
            headers: {
                'x-access-token': token , 
            }
        }) ;

        return response?.data?.data ; 
    } catch (error) {
        console.log('Get user by id request error ',error);
        throw error.response.data ;
    }
}