"use client";

import { useUserAuth } from "./_utils/auth-context";
import { useRouter } from 'next/navigation';
import { useEffect } from "react"
import Image from "next/image"
import Login from "@/components/custom/login";
import Header from "@/components/custom/header"

export default function Page(){

  // Get next routing
  const router = useRouter()

  // Use the useUserAuth hook to get the user object and the login and logout functions
  const { user, googleSignIn } = useUserAuth()

  function toDashboard(){
    router.push("/dashboard")
  }

  // Handler function for signing in
  async function googleLogin(){

    try {
      // attempt to login via google
      await googleSignIn()
    } 
    
    catch {

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
        <Image
          src="/my-project-tracker-logo.png"
          alt="Description of my image"
          width={400}
          height={400}
        />
        <Login handleGoogleLogin={googleLogin} />
      </div>
    </div>
  )
}