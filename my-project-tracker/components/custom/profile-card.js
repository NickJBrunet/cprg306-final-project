"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import ProjectCardNew from "./project-card-new"

export default function ProfileCard({user, logout}) {

  const cardSizePX = 250

  const displayName = user.getDisplayName()
  const email = user.getEmail()
  const joinDateDisplay = user.getJoinDateString()
  
  function handleLogout(){
    logout()
  }

  console.log(user.data.metadata)

  return (
    <Card>
      <CardHeader  >
        <hr className="border-1"/>
        <div className="flex justify-around items-center m-2">
          <Image 
            src={user.data.photoURL}
            alt="Base User Profile Image"
            height={75}
            width={75}
            className="object-contain rounded-full"
          />
          <div className="flex flex-col">
            <CardDescription><b>Display Name:</b> {displayName}</CardDescription>
            <CardDescription><b>Email:</b> {email}</CardDescription>
            <CardDescription><b>Join Date:</b> {joinDateDisplay}</CardDescription>
          </div>
        </div>
        <hr className="w-2/3 mx-auto"/>
        <Button onClick={handleLogout} className="w-full my-4">
          Logout
        </Button>
        <hr className="border-1"/>
      </CardHeader>
      <CardContent>        
        <ProjectCardNew />
      </CardContent>
      <CardFooter>
        <CardDescription className="text-sm">
          Welcome <b>{displayName}</b> to <b>My Project Tracker </b>
          create and manage multiple projects tasks to stay on track!
        </CardDescription>
      </CardFooter>
    </Card>
  )
}