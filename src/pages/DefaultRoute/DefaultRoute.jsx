import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function DefaultRoute() {
    const navigate = useNavigate() ; 
    useEffect(() => {
        navigate('/auth/signin') ; 
    } ,[])
  return (
    <div>DefaultRoute</div>
  )
}

export default DefaultRoute