import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LucideLoader2, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";


export const SignupCard = (
    {      signupForm ,
           setSignupForm ,
          validationError ,
          onSignupFormSubmit,
          error ,
          isPending ,
          isSuccess
        }) => {
    const navigate = useNavigate() ; 
    
    return (
        <>
            <Card classname="w-full h-full">
                 <CardHeader>
                    <CardTitle className="font-bold text-2xl">Sign Up</CardTitle>
                    <CardDescription>
                        Sign up to access your account
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
                    <form className="space-y-3" onSubmit={onSignupFormSubmit}>
                        <Input
                         placeholder="Email"
                         required
                         onChange ={(e) => setSignupForm({...signupForm , email: e.target.value})}
                         value = { signupForm.email}
                         disabled={isPending}
                         type="email"
                        />

                        <Input
                         placeholder="Password"
                         required
                         onChange ={(e) => setSignupForm({...signupForm , password: e.target.value})}
                         value = { signupForm.password}
                         disabled={isPending}
                         type="password"
                        />

                        <Input
                         placeholder="Confirm password"
                         required
                         onChange ={(e) => setSignupForm({...signupForm , confirmPassword: e.target.value})}
                         value = { signupForm.confirmPassword}
                         disabled={isPending}
                         type="password"
                        />

                        <Input
                         placeholder="Your username"
                         required
                         onChange ={(e) => setSignupForm({...signupForm , username: e.target.value})}
                         value = { signupForm.username}
                         disabled={isPending}
                         type="text"
                        />

                        < Button
                            disabled= {isPending}
                            size ='lg'
                            type = 'submit'
                            className='w-full'
                        >
                           Continue
                        </Button>
                    </form>
                    <Separator className='my-5' />

                    <p className="text-sm text-muted-foreground mt-4">
                        Already have an account ? {" "}
                        <span 
                        onClick={() => navigate('/auth/signin')}
                        className="text-sky-600 font-semibold hover:underline cursor-pointer"
                        >
                            Sign In
                        </span>
                    </p>
                 </CardContent>
            </Card>
        </>
    )
}