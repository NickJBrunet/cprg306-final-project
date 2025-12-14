
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { getTasks } from "@/app/_services/task-services";

export default function ProjectStats({ projects = [], tasks = [] }) {

  const totalProjects = projects.length || tasks.length;

  const completedProjects =
      projects.filter((p) => p.isCompleted).length
    ||
      tasks.filter((p) => p.isCompleted).length;

  const incompleteProjects = totalProjects - completedProjects;

  return (
    <div className="flex w-full flex-wrap gap-3">
      <div className="bg-card flex h-8 min-w-40 items-center gap-3 rounded-md border px-4 shadow-sm">
        <Clock className="h-4 w-4 text-gray-500" />
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold">{totalProjects}</span>
          <span className="text-muted-foreground text-xs font-medium">
            Total
          </span>
        </div>
      </div>

      <div className="bg-card flex h-8 min-w-40 items-center gap-3 rounded-md border px-4 shadow-sm">
        <Circle className="h-4 w-4 text-red-500" />
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold">{incompleteProjects}</span>
          <span className="text-muted-foreground text-xs font-medium">
            Incomplete
          </span>
        </div>
      </div>

      <div className="bg-card flex h-8 min-w-40 items-center gap-3 rounded-md border px-4 shadow-sm">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold">{completedProjects}</span>
          <span className="text-muted-foreground text-xs font-medium">
            Complete
          </span>
        </div>
      </div>
    </div>
  );
}
