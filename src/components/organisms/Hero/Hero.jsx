import { useJoinWorkspaceModal } from '@/hooks/context/useJoinWorkspaceModal'
import React from 'react'

function Hero() {

   const { setOpenJoinWorkspace } =  useJoinWorkspaceModal() ; 
  return (
        <div className="relative w-full h-screen">
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                >
                <source src='/HeroVideo.mp4' type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
                    <h1 className="text-5xl font-bold">Welcome to Gatherly</h1>
                    <p className="text-lg mt-4">
                    Collaborate, connect, and stay productive with your team.
                    </p>
                    <div className="mt-8 flex gap-4">
                    <button onClick={() => setOpenJoinWorkspace(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
                        Create Workspace
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg">
                        Join Workspace
                    </button>
                    </div>
                </div>
        </div>

  )
}

export default Hero