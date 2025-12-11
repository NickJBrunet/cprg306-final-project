"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { columns } from "../../app/project/columns";
import { DataTable } from "../../app/project/data-table";

import { getProjects } from "@/app/_services/project-service";
/*
Components examples were examined and modified to
fit development needs from the following urls:

1. https://ui.shadcn.com/docs/components/dialog
2.
*/

/**

 @author Firaol Ahmed
 @coauthers ...
 @description component card for projects information, used on the dashboard
 @date_created December 8th, 2025

 @modified December 9th, 2025

 */
export default function ProjectCardDisplay({ projects = [], handleAdd }) {
  // const testUserId = "fgD89sGZ8wDVxEf0urpy";

  // Search Logic
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter((project) => {
    if (!search) return true;

    const searchLower = search.toLowerCase();
    const titleMatch = project.name?.toLowerCase().includes(searchLower);
    const courseMatch = project.course?.toLowerCase().includes(searchLower);

    return titleMatch || courseMatch;
  });

  return (
    <div className="project-card-display flex min-h-screen w-full flex-col">
      <div className={"h-3/4 w-full rounded-lg border p-2"}>
        <div className="mb-2 flex flex-row items-center justify-between gap-2">
          <p className={"p-2 text-2xl"}>Projects</p>

          <div className={"flex shrink-0 flex-row items-center gap-2"}>
            <div
              className={"flex h-fit min-w-83 flex-row rounded-lg border p-2"}
            >
              <Image
                src={"../search.svg"}
                alt="Search Bar"
                height={28}
                width={28}
              />
              <Input
                placeholder={"Search by the project title or course..."}
                className={"ml-2 h-full w-full focus:outline-none"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <ScrollArea
          className={"h-[93%] w-full flex-1 overflow-hidden rounded-lg border"}
        >
          <DataTable columns={columns} data={filteredProjects} />
          <div className={"w-full border"}></div>
        </ScrollArea>
      </div>
    </div>
  );
}
