import JoinWorkspaceNameModalContext  from "@/context/JoinWorkspaceNameModalContext"
import { useContext } from "react"

export const useJoinWorkspaceModal = () => {
    return useContext(JoinWorkspaceNameModalContext)
}