"use client";

import { Button } from "@/components/ui/button"
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from 'next/navigation';
import { useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Header from "@/components/custom/header"
import Image from "next/image"

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
          <div className="flex flex-col items-center w-1/4 border-2 gap-4">
            <Image 
              src={user.data.photoURL}
              alt="Base User Profile Image"
              height={250}
              width={250}
              className="object-contain rounded-lg mt-8"
            />
            <div className="text-center">
              <p>{user.data.displayName}</p>
              <p>{user.data.email}</p>
            </div>
            <Button onClick={logout}>
              Logout
            </Button>
          </div>
          <ScrollArea className="w-3/4 gap-2">
            <div className="flex flex-wrap justify-center justify-start gap-4 w-full"> 
              <div className="h-75 w-75 border-2" />
              <div className="h-75 w-75 border-2" />
              <div className="h-75 w-75 border-2" />
              <div className="h-75 w-75 border-2" />
              <div className="h-75 w-75 border-2" />
              <div className="h-75 w-75 border-2" />
              <div className="h-75 w-75 border-2" />
              <div className="h-75 w-75 border-2" />
              <div className="h-75 w-75 border-2" />
              <div className="h-75 w-75 border-2" />
              <div className="h-75 w-75 border-2" />
              <div className="h-75 w-75 border-2" />
              <div className="h-75 w-75 border-2" />  
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