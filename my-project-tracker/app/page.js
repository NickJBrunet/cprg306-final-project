"use client";

import { useUserAuth } from "./_utils/auth-context";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react"
import Image from "next/image"
import Login from "@/components/custom/login";
import SignUp from "@/components/custom/sign-up";
import Header from "@/components/custom/header"

export default function Page(){

  // Get next routing
  const router = useRouter()

  // Use the useUserAuth hook to get the user object and the login and logout functions
  const { user, googleSignIn, githubSignIn } = useUserAuth()
  const [signingUp, setSigningUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  console.log(email)
  console.log(password)

  function toDashboard(){
    router.push("/dashboard")
  }

  // Handler function for signing in
  async function googleLogin(){

    try {
      // attempt to login via google
      await googleSignIn()
    } 
    
    catch (err) {
      console.log(err)
    }
  }

  // Handler function for signing in
  async function githubLogin(){

    try {
      // attempt to login via google
      await githubSignIn()
    } 
    
    catch (err) {
      console.log(err)
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
            handleGoogleLogin={googleLogin} 
            handleGithubLogin={githubLogin} 
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