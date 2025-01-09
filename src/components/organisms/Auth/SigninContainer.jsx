import { useNavigate } from "react-router-dom";
import { SigninCard } from "./SigninCard";
import { useSignin } from "@/hooks/apis/auth/useSignin";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const  SigninContainer = () => {
    const [signinForm ,setSigninForm] = useState({
        email: '' ,
        password: '' ,
    }) ;

    const navigate = useNavigate() ;
    const [validationError , setValidationError] = useState(null) ; 
    const {onPending , isSuccess , signinMutation , error} = useSignin() ; 
    async function onSigninFormSubmit(e){
        e.preventDefault() ;
        // console.log('Signup form submitted ',signinForm);

        if(!signinForm.email || !signinForm.password) {
            // console.error('All fields are required');
            setValidationError({ message: 'All fields are required' });
            return;
        }
        
        setValidationError(null) ; 

        await signinMutation({password: signinForm.password , email: signinForm.email})
    }

    useEffect(() => {
        if(isSuccess) {
            setTimeout(() => {
                navigate('/home') ; 
            } , 1000) ; 
        }
    },[isSuccess,navigate])

    return (
        <SigninCard
         onPending={onPending}
         signinForm={signinForm}
         setSigninForm={setSigninForm}
         validationError={validationError}
         onSigninFormSubmit={onSigninFormSubmit}
         error={error}
         isSuccess={isSuccess}
        />
    )
}