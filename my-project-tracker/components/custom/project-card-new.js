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

export default function ProjectCardNew() {

  const cardSizePX = 250
  const cardContainerStyle = `h-[${cardSizePX}px] w-[${cardSizePX}px] border-2`

  return (
    <Card className="hover:shadow-lg w-full">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
        <CardDescription>Will create a new project where a task list can be created to help manage your new project!</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Button className="text-xl">+</Button>
        <CardDescription>Create new project</CardDescription>
      </CardContent>
    </Card>
  )
}