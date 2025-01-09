import { CreateChannelModal } from '@/components/molecules/CreateChannelModal/CreateChannelModal'
import { CreateWorkspaceModal } from '@/components/molecules/CreateWorkspaceModal/CreateWorkspaceModal'
import WorkspacePreferencesModal from '@/components/molecules/Workspace/WorkspacePreferencesModal'
import React from 'react'
import JoinWorkspaceModal from './JoinWorkspaceModal'

function Modals() {
  return (
    <>
      <CreateWorkspaceModal/>
      <WorkspacePreferencesModal/>
      <CreateChannelModal/>
      <JoinWorkspaceModal />
    </>
  )
}

export default Modals