"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import ProjectForm from "./project-form";

/**

@author Nick Brunet
@coauthers ...
@description Component card for prompting project creation form

@date_created December 2nd, 2025

@modified December 8th, 2025
          - Added comments + Untracked ui changes

*/

export default function ProjectCardNew({ user, handleAdd }) {
  /* 
    Use States 
  */
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [dueDateRange, setDueDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });

  /* 
    Main Component 
  */
  return (
    <Card className="w-full text-center">
      {/* Card header for new project description */}
      <CardHeader>
        <CardTitle>New Project</CardTitle>
        <CardDescription>
          Click button to create a new project where a task list can be created
          to help manage your new project!
        </CardDescription>
      </CardHeader>

      {/* Card content for new project dialog button and form popup */}
      <CardContent className="flex w-full justify-center gap-4">
        <ProjectForm
          user={user}
          projectName={projectName}
          setProjectName={setProjectName}
          projectDescription={projectDescription}
          setProjectDescription={setProjectDescription}
          dueDateRange={dueDateRange}
          setDueDateRange={setDueDateRange}
          handleAdd={handleAdd}
        />
      </CardContent>
    </Card>
  );
}
