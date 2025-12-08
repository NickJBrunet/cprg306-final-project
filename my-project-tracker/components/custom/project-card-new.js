"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react"
import Image from "next/image"

export default function ProjectCardNew() {

  const now = new Date()
  const startDateDisplay = dateToString(now)

  const [dueDateRange, setDueDateRange] = useState({ from: now, to: NaN})

  const tooltipIconSize = 20

  function dateToString(date){
    // A regex split expression that splits at ' xx:' where xx is a number
    return `${date}`.split(/ \d{2}:/)[0] 
  }

  function handleCreateProject(){
    // to-do
    console.log("Creating new project!")
  }

  function handleDateSelect(dateRange){
    setDueDateRange({
      from: now,
      to: dateRange.to,
    })
  }

  console.log(dueDateRange)

  return (
    <Card className="hover:shadow-lg w-full">
      <CardHeader>
        <CardTitle>New Project</CardTitle>
        <CardDescription>Click button to create a new project where a task list can be created to help manage your new project!</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Dialog>
          <form onSubmit={handleCreateProject}>
            <DialogTrigger asChild>
              <Button>Create New Project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Project Creation Form</DialogTitle>
                <DialogDescription>
                  Make sure to fill in all input fields to create the project!
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <CardTitle>Details</CardTitle>
                <InputGroup className="">
                  <InputGroupInput placeholder="Project name..." />
                  <InputGroupAddon align="inline-end">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Image alt="info" src="/info.svg" width={tooltipIconSize} height={tooltipIconSize}/>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Name Length: 5-50 characters</p>
                        <p>Cannot already be a project name</p>
                      </TooltipContent>
                    </Tooltip>
                  </InputGroupAddon>
                </InputGroup>
                <InputGroup className="">
                  <InputGroupTextarea placeholder="Project description..." maxLength={150}/>
                  <InputGroupAddon align="inline-end">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Image alt="info" src="/info.svg" width={tooltipIconSize} height={tooltipIconSize}/>
                      </TooltipTrigger>
                      <TooltipContent>Description Length: 10-150</TooltipContent>
                    </Tooltip>
                  </InputGroupAddon>
                </InputGroup>
                <CardTitle>Timeline</CardTitle>
                <div className="flex flex-col items-center">
                  <div className="flex gap-2 w-full">
                    <InputGroup className="">
                      <InputGroupInput placeholder={startDateDisplay} readOnly/>
                      <InputGroupAddon align="inline-end">
                        <Image alt="calendar" src="/calendar.svg" width={tooltipIconSize} height={tooltipIconSize}/>
                      </InputGroupAddon>
                    </InputGroup>
                    <InputGroup className="">
                      <InputGroupInput placeholder={dateToString(dueDateRange.to)} readOnly/>
                      <InputGroupAddon align="inline-end">
                        <Image alt="calendar" src="/calendar.svg" width={tooltipIconSize} height={tooltipIconSize}/>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                  <Calendar
                    mode="range"
                    defaultMonth={dueDateRange?.from}
                    selected={dueDateRange}
                    onSelect={handleDateSelect}
                    numberOfMonths={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleCreateProject}>Create</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </CardContent>
    </Card>
  )
}