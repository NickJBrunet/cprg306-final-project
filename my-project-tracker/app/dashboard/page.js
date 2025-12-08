"use client";

import { Button } from "@/components/ui/button"
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from 'next/navigation';
import { useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Header from "@/components/custom/header"
import Image from "next/image"
import ProfileCard from "@/components/custom/profile-card"

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
    <div>
      {user ?
      <div>
        <Header />
        <div className="flex h-[85vh] m-4 gap-4">
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