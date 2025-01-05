import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'


function MessageRenderer({value}) {
  

  const rendererRef = useRef() ; 
  const [isEmpty , setIsEmpty] = useState(false) ; 

  useEffect(() => {
      if(!rendererRef.current) return ; 
      const quill = new Quill(document.createElement('div'),{
        theme: 'snow'
      }) ;
      //disable editing 

      quill.disable() ; 

      const content = JSON.parse(value) ; 
      quill.setContents(content) ; 
      const isContentEmpty = quill.getText().trim().length === 0 ; 
      setIsEmpty(isContentEmpty) ; 
      rendererRef.current.innerHTML = quill.root.innerHTML ; 

    //   return () => {
    //     rendererRef.current.innerHTML = '' ;
    //   }
  } , [value]) ;

  if(isEmpty) return null ; 

  return (
    <div ref={rendererRef} className='ql-editor ql-renderer' />
  )
}

export default MessageRenderer