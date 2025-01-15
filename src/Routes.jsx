import { Route, Routes } from "react-router-dom"

import { SignupContainer } from "@/components/organisms/Auth/SignupContainer"
import { SigninContainer } from "@/components/organisms/Auth/SigninContainer"
import Notfound from "@/pages/Notfound/Notfound"
import Home from "./pages/Home/Home"
import ProtectedRoute from "./components/molecules/ProtectedRoute/ProtectedRoute"
import { WorkspaceLayout } from "./pages/Workspace/Layout"
import JoinPage from "./pages/Workspace/JoinPage"
import Channel from "./pages/Workspace/Channel/Channel"
import DirectMessages from "./pages/DirectMessages/DirectMessages"
import ChannelDirector from "./pages/Workspace/ChannelDirector"
import DefaultRoute from "./pages/DefaultRoute/DefaultRoute"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element = {<DefaultRoute /> } />
            {/* <Route path='/auth/signup' element={<Auth><SignupContainer/></Auth>} /> */}
            {/* <Route path='/auth/signin' element={<Auth><SigninContainer/></Auth>} /> */}
            <Route path='/auth/signup' element={<SignupContainer/>}/>
            <Route path='/auth/signin' element={<SigninContainer/>} />
            <Route path='/home' element={<ProtectedRoute> <Home/> </ProtectedRoute>} />
            <Route path='/workspaces/:workspaceId' element={<ProtectedRoute> <WorkspaceLayout> <ChannelDirector/> </WorkspaceLayout> </ProtectedRoute>} />
            <Route path='/workspaces/:workspaceId/channels/:channelId' element={<ProtectedRoute> <WorkspaceLayout> <Channel/> </WorkspaceLayout> </ProtectedRoute>} />
            <Route path='/workspace/:workspaceId/members/:memberId' element={<ProtectedRoute> <WorkspaceLayout> <DirectMessages/> </WorkspaceLayout> </ProtectedRoute>} />
            <Route path="/workspaces/join/:workspaceId" element={ <JoinPage/> } />
            
            
            <Route path='/*' element={<Notfound/>} />
        </Routes>
    )
}