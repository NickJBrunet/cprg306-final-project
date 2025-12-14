"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import ProjectCardNew from "./project-card-new";
import TaskCardNew from "./task-card-new";

/**

@author Nick Brunet
@coauthers ...
@description Component card for user profile information, logout and new project creation

@date_created December 2nd, 2025

@modified December 8th, 2025
          - Added comments + Untracked ui changes

*/

export default function ProfileCard({ user, logout, handleAddProject, handleAddTask, project }) {
  /* 
    Constants 
  */
  const displayName = user.getDisplayName();
  const email = user.getEmail();
  const joinDateDisplay = user.getJoinDateString();

  /* 
    Main component 
  */
  return (
    <Card>
      {/* Card header for user profile details */}
      <CardHeader className={"overflow-auto"}>
        <hr className="border" />
        <div className="my-2 flex items-center justify-around">
          <Image
            src={user.data.photoURL}
            alt="Base User Profile Image"
            height={45}
            width={45}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col overflow-auto">
            <CardDescription>
              <b>Display Name:</b> {displayName}
            </CardDescription>
            <CardDescription>
              <b>Email:</b> {email}
            </CardDescription>
            <CardDescription>
              <b>Join Date:</b> {joinDateDisplay}
            </CardDescription>
          </div>
        </div>
        {logout ?
          <div className="flex align-center flex-col">
            <hr className="mx-auto w-2/3" />
            <Button onClick={() => logout()} className="mx-auto my-4 w-fit">
              Logout
            </Button>
          </div>
        : 
          null
        }
        <hr className="border" />
      </CardHeader>

      {/* Card content for new project creation card */}
      <CardContent className="">
        {project ?
          <TaskCardNew user={user} handleAddTask={handleAddTask} />
        :
          <ProjectCardNew user={user} handleAddProject={handleAddProject} />
        }
      </CardContent>

      {/* Card footer for application welcome message */}
      <CardFooter>
        <CardDescription className="text-center text-sm">
          Welcome <b>{displayName}</b> to <b>My Project Tracker </b>
          create and manage multiple projects tasks to stay on track!
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
