import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css' ; 
import { Button } from '@/components/ui/button';
import { PiTextAa } from 'react-icons/pi'
import { Hint } from '../Hint/Hint';
import { ImageIcon, XIcon } from 'lucide-react';
import { MdSend } from 'react-icons/md';

function Editor({
    variant = 'create' , 
    onSubmit , 
    onCancel , 
    placeholder , 
    disabled , 
    defaultValue
}) {

  const [isToolbarVisible , setIsToolbarVisible] = useState(false) ;
  const containerRef = useRef() ; //reqd to initialize the editor

  const quillRef = useRef() ; 
  const defaultValueRef = useRef() ; 
  const [image , setImage] = useState(null) ; 
  const imageInputRef = useRef(null) ; 

   function toggleToolbar() {
         setIsToolbarVisible(!isToolbarVisible) ; 
         const toolbar = containerRef.current.querySelector('.ql-toolbar') ; 

         if(toolbar){
            toolbar.classList.toggle('hidden') ; 
         }
   } 


  useEffect(() => {
    if(!containerRef.current) {
             return  ; 
    }

    const container = containerRef.current ; // get the container element
    const editorContainer = container.appendChild(container.ownerDocument.createElement('div')) ;
    
    const options = {
        theme: 'snow',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['link'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['clean']
            ],
            keyboard: {
                bindings: {
                    enter: {
                        key: 'Enter',
                        handler: () => {
                            return;
                        }
                    },
                    shift_enter: {
                        key: 'Enter',
                        shiftKey: true,
                        handler: () => {
                            quill.insertText(quill.getSelection()?.index || 0, '\n'); // insert a new line
                        }
                    }
                }
            }
        }
    };

    const quill = new Quill(editorContainer , options) ; 
    
    quillRef.current = quill ; 
    quillRef.current.focus() ; 

    quill.setContents(defaultValueRef.current)
  } , [])  ;

  return (
    <div className='flex flex-col'>

            <div
                            className='flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white '
                        >
                            <div className='h-full ql-custom' ref={containerRef} />

                            {
                                image && (
                                    <div className="p-2">
                                         <div className="relative size-[60px] flex items-center justify-center group/image">
                                             <button 
                                                className='hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[5] border-2 border-white items-center justify-center'
                                                onClick={() => {
                                                        setImage(null) ; 
                                                        imageInputRef.current.value = '' ; 
                                                }}
                                             >
                                                <XIcon className='size-4' />
                                             </button>
                                             <img 
                                               className='rounded-xl overflow-hidden border object-cover'
                                               src={URL.createObjectURL(image)}
                                             />
                                         </div>
                                    </div>
                                )
                            }

                            <div className='flex px-2 pb-2 z-[5] gap-3'>
                                <Hint label={!isToolbarVisible ? 'Show toolbar' : 'Hide toolbar'} side='bottom' align='center'>
                                    <Button
                                        size="iconSm"
                                        variant="ghost"
                                        disabled={false}
                                        onClick={toggleToolbar}
                                    >
                                        <PiTextAa className='size-4' />
                                    </Button>
                                </Hint>

                                <Hint label="Image">
                                    <Button
                                        size="iconSm"
                                        variant="ghost"
                                        disabled={false}
                                        onClick={() => {imageInputRef.current.click()}}
                                    >
                                        <ImageIcon className='size-4' />
                                    </Button>
                                </Hint>
                                 
                                <input
                                  ref={imageInputRef} 
                                  type="file" 
                                  className='hidden' 
                                  onChange={(e) => setImage(e.target.files[0])}
                                />

                                <Hint label="Send Message">
                                    <Button
                                        size="sm"
                                        className="ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white"
                                        onClick={() => {

                                            const messageContent = JSON.stringify(quillRef.current?.getContents());                                            
                                            onSubmit({ body: messageContent , image });
                                            quillRef.current?.setText('');
                                            setImage(null) ; 
                                            imageInputRef.current.value = '' ;
                                        }}
                                        disabled={false}
                                    >
                                        <MdSend className='size-4' />
                                    </Button>
                                </Hint>
                            </div>
                        </div>

                        <p
                            className='p-2 text-[10px] text-mutes-foreground flex justify-end'
                        >
                            <strong>Shift + return</strong> &nbsp; to add a new line
                        </p>
    </div>
  )
}

export default Editor