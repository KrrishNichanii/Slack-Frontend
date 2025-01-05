import { SignupCard } from "@/components/organisms/Auth/SignupCard"
import { SigninCard } from "@/components/organisms/Auth/SigninCard"

export const Auth = ({children}) => {
    return( 
        <div className="h-[100vh] flex items-center justify-center bg-slack">
            <div className="md:h-auto md:w-[420px]">
               {children}
            </div>
        </div>
    )
}