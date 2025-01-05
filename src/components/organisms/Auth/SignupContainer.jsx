import { useEffect, useState } from "react";
import { SignupCard } from "./SignupCard";
import { useSignUp } from "@/hooks/apis/auth/useSignup";
import { useNavigate } from "react-router-dom";

export const SignupContainer = () => {
    const [signupForm ,setSignupForm] = useState({
        email: '' ,
        password: '' ,
        confirmPassword: '' ,
        username: ''
    }) ;
    
    const navigate = useNavigate() ;
    const [validationError , setValidationError] = useState(null) ; 
    const {  isPending , isSuccess ,error , signUpMutation } = useSignUp() ; 
    
    async function onSignupFormSubmit(e) {
        e.preventDefault() ;
        console.log('Signup form submitted ',signupForm);

        if(!signupForm.email || !signupForm.password || !signupForm.confirmPassword || !signupForm.username) {
            console.error('All fields are required');
            setValidationError({ message: 'All fields are required' });
            return;
        }

        if(signupForm.password !== signupForm.confirmPassword) {
            console.error('Passwords do not match');
            setValidationError({ message: 'Passwords do not match' });
            return;
        }

        setValidationError(null) ; 
        
        await signUpMutation({
            email: signupForm.email , 
            username: signupForm.username , 
            password: signupForm.password , 
        })
    }
    
    useEffect(() => {
        if(isSuccess) {
            setTimeout(() => {
                navigate('/auth/signin') ; 
            } , 2000) ; 
        }
    },[isSuccess,navigate])

    return (
        <SignupCard 
            error={error}
            isPending={isPending}
            isSuccess={isSuccess}
            signupForm={signupForm} 
            setSignupForm={setSignupForm} 
            validationError={validationError}
            onSignupFormSubmit={onSignupFormSubmit}
        />
    )
}