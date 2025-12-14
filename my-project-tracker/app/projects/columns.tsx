"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
  id: string;
  name: string;
  course: string;
  dateDue: Date;
  dateCreated: Date;
  isCompleted: boolean;
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Title",

    cell: ({ row }) => {
      return (
        <Link
          href={`/projects/${row.original.id}`}
          className={"cursor-pointer hover:underline"}
        >
          {row.getValue("name")}
        </Link>
      );
    },
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",

    cell: ({ row }) => {
      const date = row.getValue("dateCreated");
      if (date && typeof date === "object" && "seconds" in date) {
        return new Date(date.seconds * 1000).toLocaleDateString();
      }
      return new Date(date as string).toLocaleDateString();
    },
  },
  {
    accessorKey: "dateDue",
    header: "Due Date",

    cell: ({ row }) => {
      const date = row.getValue("dateDue");
      if (date && typeof date === "object" && "seconds" in date) {
        return new Date(date.seconds * 1000).toLocaleDateString();
      }
      return new Date(date as string).toLocaleDateString();
    },
  },
  {
    accessorKey: "isCompleted",
    header: "Status",

    cell: ({ row }) => {
      const isCompleted = row.getValue("isCompleted") as boolean;

      return (
        <div className="flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full ${
              isCompleted ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <p>{isCompleted ? "Done" : "In-Progress"}</p>
        </div>
      );
    },
  },
];
