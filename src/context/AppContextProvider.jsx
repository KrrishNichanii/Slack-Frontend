import combineContext from "@/utils/combineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContext";
import { WorkspacePreferencesModalContextProvider } from './WorkspacePreferencesModalContext' ;
import { CreateChannelContextProvider } from "./CreateChannelContext";
import { WorkspaceContextProvider } from "./WorkspaceContext";
import { SocketContextProvider } from "./SocketContext";
import { ChannelMessagesProvider } from "./ChannelMessagesContext";
import { JoinWorkspaceNameModalContextProvider } from "./JoinWorkspaceNameModalContext";

export const AppContextProvider = combineContext(
    JoinWorkspaceNameModalContextProvider ,
    ChannelMessagesProvider ,
    SocketContextProvider ,
    AuthContextProvider ,
    CreateWorkspaceContextProvider ,
    WorkspacePreferencesModalContextProvider ,
    CreateChannelContextProvider ,
    WorkspaceContextProvider ,
)