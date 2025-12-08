
import { Button } from "@/components/ui/button"
import {
  Dialog,
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
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Calendar } from "@/components/ui/calendar"
import { CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import Image from "next/image"
import Project from "@/classes/project"

/**

@author Nick Brunet
@coauthers ...
@description Component for handling project creation form

@date_created December 2nd, 2025

@modified December 8th, 2025
          - Added comments + Untracked ui changes

*/

export default function ProjectForm({ user, projectName, setProjectName, projectDescription, setProjectDescription, dueDateRange, setDueDateRange }){
  
  /* 
    Use states 
  */
  const [creationLoading, setCreationLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false);

  /* 
    Constants 
  */
  const tooltipIconSize = 20

  /* 
    Functions 
  */
  async function handleCreateProject(){

    const project = new Project(null, projectName, false, dueDateRange.to, dueDateRange.from, projectDescription, [])

    setCreationLoading(true)

    await user.createNewProject(project)

    setCreationLoading(false)
    setDialogOpen(false)

    console.log("Created new project! docId: " + project.docId)
  }

  function handleProjectName(event){
    setProjectName(event.target.value)
  }

  function handleProjectDescription(event){
    setProjectDescription(event.target.value)
  }

  function handleDateSelect(dateRange){
    setDueDateRange({
      from: new Date(),
      to: dateRange.to,
    })
  }

  function dateToString(date){
    // A regex split expression that splits at ' xx:' where xx is a number
    return `${date}`.split(/ \d{2}:/)[0] 
  }

  /* 
    Main component 
  */

  return(
    <Dialog open={dialogOpen}>
      <form onSubmit={handleCreateProject}>

        {/* Main button trigger to prompt dialog */}
        <DialogTrigger asChild>
          <Button onClick={() => setDialogOpen(true)}>Create New Project</Button>
        </DialogTrigger>

        {/* Dialog popup container */}
        <DialogContent className="flex flex-col p-2">

          {/* Dialog header container */}
          <DialogHeader>
            <DialogTitle>Project Creation Form</DialogTitle>
            <DialogDescription>
              Make sure to fill in all input fields to create the project!
            </DialogDescription>
          </DialogHeader>
          
          {/* Dialog content container */}
          <div className="grid gap-4">

            {/* Details content container: includes project name input and project description */}
            <CardTitle>Details</CardTitle>

            {/* Project name container */}
            <InputGroup className="">
              <InputGroupInput 
                placeholder="Project name..." 
                value={projectName}
                onChange={handleProjectName}
              />
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
    
            {/* Project description container */}
            <InputGroup className="">
              <InputGroupTextarea 
                placeholder="Project description..." 
                maxLength={150}
                value={projectDescription}
                onChange={handleProjectDescription}
              />
              <InputGroupAddon align="inline-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Image alt="info" src="/info.svg" width={tooltipIconSize} height={tooltipIconSize}/>
                  </TooltipTrigger>
                  <TooltipContent>Description Length: 10-150</TooltipContent>
                </Tooltip>
              </InputGroupAddon>
            </InputGroup>

            {/* Timeline container: select project timeline approximation */}
            <CardTitle>Timeline</CardTitle>

            {/* Project timeline container */}
            <div className="flex flex-col items-center">

              {/* Read only start and end date inputs for project timeline */}
              <div className="flex gap-2 w-full">
                <InputGroup className="">
                  <InputGroupInput placeholder={dateToString(dueDateRange.from)} readOnly/>
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

              {/* Calendar component to select project timeline */}
              <Calendar
                mode="range"
                defaultMonth={dueDateRange?.from}
                selected={dueDateRange}
                onSelect={handleDateSelect}
                numberOfMonths={2}
              />
            </div>
          </div>

          {/* Dialog footer for canceling and project creation handling */}
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateProject}>{creationLoading ? <Spinner/> : <></>}Create</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}