"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

import { updateTaskStatus } from "../../app/_services/task-services";
import { updateProjectStatus } from "../../app/_services/project-service";

import { taskColumns } from "@/app/project/[docId]/task-columns";
import { DataTable } from "@/app/project/data-table";

/*
Components examples were examined and modified to
fit development needs from the following urls:

1. https://ui.shadcn.com/docs/components/dialog
2.
*/

/**

 @author Firaol Ahmed
 @coauthers ...
 @description component card for tasks information, used on the dashboard
 @date_created December 12th, 2025

 @modified December 14th, 2025

 */
export default function TaskCardDisplay({ tasks, setTasks, user, projectId }) {
  // const testUserId = "fgD89sGZ8wDVxEf0urpy";

  useEffect(() => {
    if (tasks) setTasks(tasks);
  }, [tasks]);

  const handleUpdateStatus = async(task, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, isCompleted: newStatus } : t))
    )

    if (user?.docId && projectId) {
      const success = await updateTaskStatus(user.docId, projectId, task.id, newStatus);

      if (!success) {
        console.log("Update unsuccessful")
        setTasks((prev) =>
          prev.map((t) => (t.id === task.id ? { ...t, isCompleted: !newStatus } : t))
        );
      }
    }

  }

  // Search Logic
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((project) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    const titleMatch = project.name?.toLowerCase().includes(searchLower);

    return titleMatch;
  });

  return (
    <div className="project-card-display flex min-h-screen w-full flex-col mt-4">
      <div className={"h-3/4 w-full rounded-lg border p-2"}>
        <div className="mb-2 flex flex-row items-center justify-between gap-2">
          <p className={"p-2 text-2xl"}>Tasks</p>

          <div className={"flex flex-row items-center gap-2"}>
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
                placeholder={"Search by the task title..."}
                className={"ml-2 h-full w-full focus:outline-none"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <ScrollArea
          className={"h-[93%] w-full flex-1 overflow-hidden rounded-lg"}
        >
          <DataTable columns={taskColumns} data={filteredTasks} meta={{updateStatus: handleUpdateStatus}}/>
        </ScrollArea>
      </div>
    </div>
  );
}
