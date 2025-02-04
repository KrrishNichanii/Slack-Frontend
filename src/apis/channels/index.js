import axios from '@/config/axiosConfig';



export const getChannelById = async ({channelId ,token}) => {
    try {
        const response = await  axios.get(`/channels/${channelId}`,{
            headers: {
                'x-access-token': token ,
            }
        })

        return response?.data?.data ; 
    } catch (error) {
        console.log('Error in getChannelByIdRequest ', error);
        throw error.response.data ; 
    }
}

export const getPaginatedMessages = async ({channelId , token , limit , offset}) => {
       try {
          const response = await  axios.get(`/messages/${channelId}`,{
                params:{
                    limit: limit || 20 , 
                    offset: offset || 0 ,
                } ,
                headers: {
                    'x-access-token': token
                }
            }) ;

            return response?.data?.data ; 
       } catch (error) {
        console.log('Error in getPaginatedMessagesRequest', error);
       }
}

export const getDirectMessageChannelIdRequest = async ({receiverId , token , workspaceId}) => {
    try {
        const response = await axios.get(`/direct-messages/${receiverId}/${workspaceId}`,{
            headers: {
                'x-access-token': token , 
            }
        }); 

        return response?.data?.data ; 
    } catch (error) {
        console.log('Error in getDirectMessageChannelIdRequest ', error);
    }
}