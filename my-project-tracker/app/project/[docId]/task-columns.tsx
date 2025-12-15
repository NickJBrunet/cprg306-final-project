"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Task = {
  id: string;
  name: string;
  description: string;
  dateDue: Date;
  dateCreated: Date;
  isCompleted: boolean;
};

export const taskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",

    cell: ({ row }) => {
      let date = row.getValue("dateCreated");
      return new Date(date as string).toLocaleDateString();
    },
  },
  {
    accessorKey: "dateDue",
    header: "Due Date",

    cell: ({ row }) => {
      const date = row.getValue("dateDue");
      return new Date(date as string).toLocaleDateString();
    },
  },
  {
    accessorKey: "isCompleted",
    header: "Status",

    cell: ({ row, table }) => {
      const isCompleted = row.getValue("isCompleted") as boolean;

      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={isCompleted}
            onCheckedChange={(checked) =>
              table.options.meta?.updateStatus?.(row.original, checked)
            }
          />
          <span className="text-muted-foreground w-12 text-xs">
            {isCompleted ? "Complete" : "Incomplete"}
          </span>
        </div>
      );
    },
  },
];
