"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
    name: string
    course: string
    dateDue: Date
    dateCreated: Date
    isCompleted: boolean
}

export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "name",
        header: "Title",
    },
    {
        accessorKey: "course",
        header: "Course",
    },
    {
        accessorKey: "dateCreated",
        header: "Date Created",
    },
    {
        accessorKey: "dateDue",
        header: "Due Date",
    },
    {
        accessorKey: "isCompleted",
        header: "Status",
    },
]