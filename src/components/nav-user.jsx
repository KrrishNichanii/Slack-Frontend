"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Plus,
  Sparkles,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/context/useAuth"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal"
import  PopoverComponent from "@/components/atoms/PopoverComponent/PopoverComponent"
import { useJoinWorkspaceModal } from "@/hooks/context/useJoinWorkspaceModal"

export function NavUser({
}) {
  const { auth } = useAuth() ; 
  const { isMobile } = useSidebar()
  const { logout } = useAuth() ; 
  const  navigate  = useNavigate() ; 
  const { toast } = useToast() ; 
  const [user , setUser] = useState(null) ; 

  async function handleLogout() {
    await logout() ; 
    toast({
        title: 'Successfully signed out' ,
        type: 'success' , 
    }) ;

    navigate('/auth/signin') ; 
  }
  
  const { setOpenJoinWorkspace } = useJoinWorkspaceModal() ; 
  useEffect(() => {
    setUser(auth?.user) ; 
  } ,[auth]);

  const {setOpenCreateWorkspaceModal} = useCreateWorkspaceModal() ; 

  return (
    (<SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.avatar} alt={user?.username} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.username}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.username} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.username}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing  {/* add payment subscription details here */}
              </DropdownMenuItem>
              <DropdownMenuItem onClick = {() => setOpenJoinWorkspace(true)}>
                  <Users /> 
                  Join a workspace
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenCreateWorkspaceModal(true)}>
                <Plus/>
                Create a new workspace
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>)
  );
}
