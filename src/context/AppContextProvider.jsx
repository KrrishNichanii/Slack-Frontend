import combineContext from "@/utils/combineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContext";
import { WorkspacePreferencesModalContextProvider } from './WorkspacePreferencesModalContext' ;
import { CreateChannelContextProvider } from "./CreateChannelContext";
import { WorkspaceContextProvider } from "./WorkspaceContext";
import { SocketContextProvider } from "./SocketContext";
import { ChannelMessagesProvider } from "./ChannelMessagesContext";

export const AppContextProvider = combineContext(
    ChannelMessagesProvider ,
    SocketContextProvider ,
    AuthContextProvider ,
    CreateWorkspaceContextProvider ,
    WorkspacePreferencesModalContextProvider ,
    CreateChannelContextProvider ,
    WorkspaceContextProvider ,
)