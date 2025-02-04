import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/../@/components/login-form"
import Logo from "@/components/atoms/Logo/Logo"

export default function Signin({
    signinForm ,
    setSigninForm,
    validationError,
    isSuccess,
    error,
    onSigninFormSubmit,
    onPending
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Logo className='rounded-full' size ='10'/>
            </div>
            Gatherly
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm 
                signinForm  = {signinForm}
                setSigninForm = {setSigninForm}
                validationError = {validationError}
                isSuccess = {isSuccess}
                error = {error}
                onSigninFormSubmit = {onSigninFormSubmit}
                onPending = {onPending}
            />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/LoginImage.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
