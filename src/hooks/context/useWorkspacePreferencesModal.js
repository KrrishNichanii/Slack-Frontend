import WorkspacePreferencesModalContext from '@/context/WorkspacePreferencesModalContext'
import { useContext } from 'react' ; 


const useWorkspacePreferencesModal = () => {
    return useContext(WorkspacePreferencesModalContext) ; 
}

export default useWorkspacePreferencesModal