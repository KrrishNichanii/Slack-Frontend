import SideBarItem from '@/components/atoms/SideBarItem/SideBarItem';
import { UserItem } from '@/components/atoms/UserItem/UserItem';
import WorkspacePanelHeader from '@/components/molecules/Workspace/WorkspacePanelHeader';
import WorkspacePanelSection from '@/components/molecules/Workspace/WorkspacePanelSection';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';
import { useAuth } from '@/hooks/context/useAuth';
import { useCreateChannelModal } from '@/hooks/context/useCreateChannelModal';
import { AlertTriangleIcon, HashIcon, Loader, MessageSquareTextIcon, SendHorizonalIcon } from 'lucide-react';
import React from 'react'
import { useParams } from 'react-router-dom'

function WorkspacePanel() {
    const {workspaceId} = useParams() ;
    const { auth } = useAuth() ; 

    const { workspace ,isFetching , error , isSuccess } = useGetWorkspaceById(workspaceId) ;
    const {setOpenCreateChannelModal} = useCreateChannelModal() ;

    if(isFetching){
        return (
            <div className="flex flex-col gap-y-2 h-full items-center justify-center text-white">
                <Loader className='animate-spin size-6 text-white'/>
            </div>
        )
    }

    if(!isSuccess){
        return (
            <div className="flex flex-col gap-y-2 h-full items-center justify-center text-white">
                <AlertTriangleIcon className='size-6 text-white'/>
                Something went wrong
            </div>
        )
    }
//   console.log('M ' ,workspace.members);
  
  return (
      <div 
      className="flex flex-col h-full bg-slack-medium"
      >
          <WorkspacePanelHeader workspace={workspace} />

          <div className="flex flex-col px-2 mt-3 gap-1.5">
                <SideBarItem
                    
                    label='Threads'
                    icon={MessageSquareTextIcon}
                    id={'threads'}
                    variant='active'
                />

                <SideBarItem
                    
                    label='Drafts & Sends'
                    icon={SendHorizonalIcon}
                    id='drafts'
                    variant='default'
                />
          </div>

          <WorkspacePanelSection 
                label='Channels' 
                onIconClick={() => {setOpenCreateChannelModal(true)}}         
          >
          {
                workspace?.channels?.map((channel) => { 
                    if(channel?.name !== 'DM')
                    return <SideBarItem
                      key={channel._Id}
                      label={channel.name}
                      icon={HashIcon}
                      id={channel._id}
                    />
                })
            }
          </WorkspacePanelSection>

          <WorkspacePanelSection
              label= "Direct Messages"
              onIconClick={() => {}}
          >
             {workspace?.members?.map((member) => {
                if(auth?.user?._id !== member?.memberId?._id)
                return <UserItem
                     key = {member._id}
                     label = {member.memberId.username}
                     id = {member.memberId._id}
                     image={member.memberId.avatar}
                 />
             })}
          </WorkspacePanelSection>
      </div>
  )
}

export default WorkspacePanel