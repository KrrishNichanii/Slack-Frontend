import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LucideLoader2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const SigninCard = ({
    signinForm ,
    setSigninForm,
    validationError,
    isSuccess,
    error,
    onSigninFormSubmit,
    onPending
}) => {
    const navigate = useNavigate() ;



    return (
        <>
            <Card classname="w-full h-full">
                 <CardHeader>
                    <CardTitle className="font-bold text-2xl">Sign In</CardTitle>
                    <CardDescription>
                        Sign In to your account
                    </CardDescription>
                    {validationError && (
                        <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                              <TriangleAlert className="size-5" />
                              <p>{validationError.message}</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                              <TriangleAlert className="size-5" />
                              <p>{error.message}</p>
                        </div>
                    )}

                    {
                        isSuccess && (
                            <div className="bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-5">
                                <FaCheck className="size-5"/>
                                <p>Successfully signed up. You will be redirected to the login page in a few seconds</p>

                                <LucideLoader2 className="animate-spin ml-2" />
                            </div>
                        )
                    }
                 </CardHeader>

                 <CardContent>
                    <form className="space-y-3" onSubmit={onSigninFormSubmit}>
                        <Input
                         placeholder="Email"
                         required
                         onChange ={(e) => setSigninForm({...signinForm , email: e.target.value})}
                         value = { signinForm.email}
                         disabled={onPending}
                         type="email"
                        />

                        <Input
                         placeholder="Password"
                         required
                         onChange ={(e) => setSigninForm({...signinForm , password: e.target.value})}
                         value = { signinForm.password}
                         disabled={onPending}
                         type="password"
                        />

                        < Button
                            disabled= {onPending}
                            size ='lg'
                            type = 'submit'
                            className='w-full'
                        >
                           Continue
                        </Button>
                    </form>
                    <Separator className='my-5' />

                    <p className="text-sm text-muted-foreground mt-4">
                        Don't have an account ? {" "}
                        <span 
                        onClick={() => navigate('/auth/signup')}
                        className="text-sky-600 font-semibold hover:underline cursor-pointer"
                        >
                            Sign Up
                        </span>
                    </p>
                 </CardContent>
            </Card>
        </>
    )
}