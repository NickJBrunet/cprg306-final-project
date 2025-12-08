"use client";

import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from 'next/navigation';
import { useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Header from "@/components/custom/header"
import ProfileCard from "@/components/custom/profile-card"

/**

@author Nick Brunet
@coauthers ...
@description main page route for user projects

@date_created December 2nd, 2025

@modified December 8th, 2025

*/

export default function Page(){
  const router = useRouter()
  const { user, firebaseSignOut } = useUserAuth()



  function toLogin(){
    router.replace("/")
  }

  async function logout(){
    // Sign out of Firebase
    await firebaseSignOut()
  }

  useEffect(() => {
    if (!user){
      toLogin()
    }
  }, [user])

  return (
    <div> {/* Wrapper Container */}
      {user ? // if user is not set, there is in error, will auto redirect to login page.
      <div className="h-max-[85vh]">
        <Header />
        <div className="flex m-4 gap-4">
          <div className="w-1/5 h-full">
            <ProfileCard user={user} logout={logout} />
          </div>
          <ScrollArea className="w-3/4 gap-2">
            <div className="flex flex-wrap justify-center justify-start gap-4 w-full"> 
            </div>
          </ScrollArea>
        </div>
      </div>
      :
      <p>error</p> 
      }
    </div>
  )
}