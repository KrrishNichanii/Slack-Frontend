import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

function DirectMessages() {

    const {workspaceId , memberId} = useParams() ; 
    useEffect(() => {
        
        console.log('WID & MID ',workspaceId , memberId);        
    } , []) ;

  return (
    <div>DirectMessages</div>
  )
}

export default DirectMessages