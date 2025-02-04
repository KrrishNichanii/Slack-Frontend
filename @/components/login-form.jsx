import { cn } from "@/lib/utils"
import { Button } from "@/../@/components/ui/button"
import { Input } from "@/../@/components/ui/input"
import { Label } from "@/../@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { LucideLoader2, TriangleAlert } from "lucide-react"
import { FaCheck } from "react-icons/fa"

export function LoginForm({
  className,
  signinForm ,
  setSigninForm,
  validationError,
  isSuccess,
  error,
  onSigninFormSubmit,
  onPending ,
  ...props 
}) {

  const navigate = useNavigate() ; 

  return (
    (<form 
        className={cn("flex flex-col gap-8", className)} 
        {...props}
        onSubmit={onSigninFormSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
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
            disabled={onPending}
            onChange ={(e) => setSigninForm({...signinForm , email: e.target.value})}
            value = { signinForm?.email}
          />
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input 
            id="password" 
            type="password" 
            required 
            disabled = {onPending}
            onChange ={(e) => setSigninForm({...signinForm , password: e.target.value})}
            value = { signinForm?.password}
          />
        </div>
         
         <div className="mt-3">
              <Button disabled = {onPending} type="submit" className="w-full">
                Login
              </Button>
         </div>
         
      </div>
      <div className="mt-3 text-center text-sm">
        Don&apos;t have an account?{" "}
         <span 
          onClick={() => navigate('/auth/signup')}
          className="text-sky-600 font-semibold hover:underline cursor-pointer"
          >
              Sign Up
          </span>
      </div>
    </form>)
  );
}
