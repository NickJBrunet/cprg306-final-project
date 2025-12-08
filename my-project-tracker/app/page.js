"use client";

// Non-Default Imports
import { useUserAuth } from "./_utils/auth-context";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react"

// Default Imports
import Image from "next/image"
import Login from "@/components/custom/login";
import SignUp from "@/components/custom/sign-up";
import Header from "@/components/custom/header"
import LoadingScreen from "@/components/custom/loading-screen"

/**

@author Nick Brunet
@coauthers ...
@description Main route page responsible for handling signup and login to My Project Tracker

@date_created December 2nd, 2025

*/

export default function Page(){

  // Get next routing
  const router = useRouter()

  // Use the useUserAuth hook to get the user object and the login and logout functions
  const { user, googleSignIn, githubSignIn } = useUserAuth()
  const [signingUp, setSigningUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [creationLoading, setCreationLoading] = useState(false)

  console.log(creationLoading)

  function toDashboard(){
    router.push("/dashboard")
  }

  // Handler function for signing in
  async function googleLogin(){

    try {
      // attempt to login via google
      setCreationLoading(true)
      await googleSignIn()
      setCreationLoading(false)
    } 
    
    catch (err) {
      console.log(err)
      setCreationLoading(false)
    }
  }

  // Handler function for signing in
  async function githubLogin(){

    try {
      // attempt to login via google
      setCreationLoading(true)
      await githubSignIn()
      setCreationLoading(false)
    } 
    
    catch (err) {
      console.log(err)
      setCreationLoading(false)
    }
  }

  useEffect(() => {
    if (user){
      toDashboard()
    }
  }, [user])

  return (
    <div>
      <Header />
      <LoadingScreen enabled={creationLoading}/>
      <div className="flex justify-center w-full mt-24 gap-24">
        <div>
          <Image
            src="/my-project-tracker-logo.png"
            alt="Description of my image"
            width={400}
            height={400}
            objectFit="contain"
          />
        </div>
        {signingUp == true ?
          <SignUp 
            setSigningUp={setSigningUp} 
            email={email} 
            setEmail={setEmail} 
            password={password} 
            setPassword={setPassword} 
          />
        :
          <Login 
            googleLogin={googleLogin} 
            githubLogin={githubLogin} 
            setSigningUp={setSigningUp} 
            email={email} 
            setEmail={setEmail} 
            password={password} 
            setPassword={setPassword} 
          />
        }
      </div>
    </div>
  )
}