import { cn } from "@/lib/utils"
import { Button } from "@/../@/components/ui/button"
import { Input } from "@/../@/components/ui/input"
import { Label } from "@/../@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { LucideLoader2, TriangleAlert } from "lucide-react"
import { FaCheck } from "react-icons/fa"

export function SignupForm({
    className,
    error ,
    isPending ,
    isSuccess ,
    signupForm  ,
    setSignupForm ,
    validationError ,
    onSignupFormSubmit ,
    ...props 
}) {

  const navigate = useNavigate() ; 

  return (
    (<form 
        className={cn("flex flex-col gap-8", className)} 
        {...props}
        onSubmit={onSignupFormSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email and username to create an account
        </p>
      </div>
      <div className="flex flex-col gap-8">
      {validationError && (
          <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                <TriangleAlert className="size-5" />
                <p>{validationError.message}</p>
          </div>
      )}

      {error && (
          <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive ">
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
        <div className="flex flex-col gap-2 mt-3">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            required 
            disabled={isPending}
            onChange ={(e) => setSignupForm({...signupForm , email: e.target.value})}
            value = { signupForm?.email}
          />
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <Label htmlFor="email">Username</Label>
          <Input 
            id="username" 
            type="text" 
            placeholder="username" 
            required 
            disabled={isPending}
            onChange ={(e) => setSignupForm({...signupForm , username: e.target.value})}
            value = { signupForm?.username}
          />
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input 
            id="password" 
            type="password" 
            required 
            disabled = {isPending} 
            onChange ={(e) => setSignupForm({...signupForm , password: e.target.value})}
            value = { signupForm?.password}
            placeholder = 'Password'
          />
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <div className="flex items-center">
            <Label htmlFor="confirm-password">Confirm Password</Label>
          </div>
          <Input 
            id="confirm-password" 
            type="password" 
            required 
            disabled = {isPending} 
            onChange ={(e) => setSignupForm({...signupForm , confirmPassword: e.target.value})}
            value = { signupForm?.confirmPassword}
            placeholder = 'Confirm Password'
          />
        </div>
         
         <div className="mt-3">
              <Button disabled = {isPending} type="submit" className="w-full">
                Sign up
              </Button>
         </div>
         
      </div>
      <div className="mt-3 text-center text-sm">
        Already have an account?{" "}
         <span 
          onClick={() => navigate('/auth/signin')}
          className="text-sky-600 font-semibold hover:underline cursor-pointer"
          >
              Sign In
          </span>
      </div>
    </form>)
  );
}
