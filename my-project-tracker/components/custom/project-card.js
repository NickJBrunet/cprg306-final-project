"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DataTable } from "../../app/projects/data-table";
import { columns } from "../../app/projects/columns";
import ProfileCard from "./profile-card";

const formatDate = (dateNum) => {
  if (!dateNum) return "N/A";
  return new Date(dateNum).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const tasks = [];
export default function ProjectCard({ project }) {
  return (
    <div className={"flex flex-col gap-4"}>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">
                {project.name || "Untitled Project"}
              </CardTitle>
              <CardDescription className="mt-2 text-base">
                {project.description || "No description provided."}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="">
          <div className="grid grid-cols-2 gap-4 rounded-lg border bg-white p-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Created</p>
              <p>{formatDate(project.dateCreated)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Due Date</p>
              <p>{formatDate(project.dateDue)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <DataTable columns={columns} data={tasks} />
    </div>
  );
}
