import axios from '@/config/axiosConfig' ;
import { useToast } from '@/hooks/use-toast';

export const createWorkspaceRequest = async ({name , description , token}) => {
    try {
    const response = await axios.post('/workspaces' ,{name , description} ,{
        headers: {
            'x-access-token': token
        }
    }) ; 
    
    console.log('Response in createWorkspace request ',response);
    
    return response?.data?.data ; 
} catch (error) {
    console.log('Error in create workspace request ',error);
    throw error.response.data ; 
    
}
} ;

export const fetchWorkspacesRequest = async ({token}) => {
    try {
        const response = await axios.get('/workspaces' ,{
            headers: {
                'x-access-token': token
            }
        }) ; 
        
        console.log('Response in fetch workspace request ',response);
        
        return response?.data?.data ; 
    } catch (error) {
        console.log('Error in fetching workspace request ',error);
        throw error.response.data ; 
    }
}

export const fetchWorkspaceDetailsRequest = async ({token , workspaceId}) => {
    try {
        const response = await axios.get(`/workspaces/${workspaceId}` ,{
            headers: {
                'x-access-token': token
            }
        }) ; 
        
        console.log('Response in fetch workspace details request ',response);
        
        return response?.data?.data ; 
    } catch (error) {
        console.log('Error in fetching workspace details request ',error);
        throw error.response ; 
    }
}

export const updateWorkspaceRequest = async ({token , workspaceId , name }) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}` ,{name} ,{
            headers: {
                'x-access-token': token
            }
        }) ; 
        
        console.log('Response in update workspace details request ',response);
        
        return response?.data?.data ; 
    } catch (error) {
        console.log('Error in updating workspace details request ',error);
        throw error.response ; 
    }
}

export const deleteWorkspaceRequest = async ({token , workspaceId}) => {
    try {
        const response = await axios.delete(`/workspaces/${workspaceId}` ,{
            headers: {
                'x-access-token': token
            }
        }) ; 
        
        console.log('Response in delete workspace  request ',response);
        
        return response?.data?.data ; 
    } catch (error) {
        console.log('Error in deleting workspace  request ',error);
        throw error.response ; 
    }
}

export const addChannelToWorkspaceRequest = async ({token , channelName , workspaceId}) => {
    try {
       const response = await axios.put(`/workspaces/${workspaceId}/channels`,{channelName} , {
            headers: {
                'x-access-token': token
            }
        }) ; 

        return response?.data?.data ; 
    } catch (error) {
        console.log('Error in adding channel to workspace request', error);
        throw error.response.data;
    }
}

export const resetJoinCodeRequest = async ({token , workspaceId}) => {
  try {
        const response = await axios.put(`/workspaces/${workspaceId}/joinCode/reset`, {} ,{
            headers: {
                'x-access-token': token , 
            }
        })

        return response?.data?.data ; 
  } catch (error) {
        console.log('Error in resetting join code request ', error);
        throw error.response.data ; 
  }
}

export const addMemberToWorkspaceRequest = async ({token , workspaceId}) => {
    try {
        const response = axios.put(`/workspaces/${workspaceId}/members` , {
            
        } ,{
            headers: {
                'x-access-token': token , 
            }
        })

        return response?.data?.data ; 
    } catch (error) {
        console.log('Error in add member to workspace request ',error);
        throw error?.response?.data ;  
        
    }
}

export const joinWorkspaceRequest = async ({ workspaceId, joinCode, token }) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/join`, { joinCode }, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    } catch(error) {
        console.log('Error in joining workspace request', error);
        throw error.response.data;
    }
};

export const sendJoinCodeEmailRequest = async ({workspaceName , joinCode , token , email}) => {
    try {
        // console.log('Tok ' , token);
        
        const response = await axios.post(`/workspaces/send-join-code`, { 
            workspaceName , 
            joinCode , 
            email , 
         }, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    } catch(error) {
        console.log('Error in sending join code email  request', error);
        throw error.response.data;
    }
}

export const getWorkspaceByNameRequest = async ({workspaceName , token}) => {
    try {
       const response = await axios.post('/workspaces/name' , {
        workspaceName , 
       } , {
            headers: {
                'x-access-token': token , 
            }
        })
        // console.log('Response in recentWorkspaces ' , response?.data);
        
        return response?.data?.data ; 
    } catch (error) {
        console.log('Error in getting workspace by name request ', error);
        throw error.response.data;
    }
}
export const getRecentWorkspaces = async ({token}) => {
    try {
       const response = await axios.get('/workspaces/recent-workspaces' , {
            headers: {
                'x-access-token': token , 
            }
        })
        // console.log('Response in recentWorkspaces ' , response?.data);
        
        return response?.data?.data ; 
    } catch (error) {
        console.log('Error in getting  recent workspaces  request ', error);
        throw error.response.data;
    }
}