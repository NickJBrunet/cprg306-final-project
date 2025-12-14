"use client";

import { useUserAuth } from "@/app/_utils/auth-context";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { getProjectByDocId } from "@/app/_services/project-service";
import Header from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import ProfileCard from "@/components/custom/profile-card";

import { getTasks } from "../../_services/task-services";
import ProjectStats from "../../../components/custom/project-stats";
import TaskCardDisplay from "../../../components/custom/task-card-display";
import { updateProjectStatus } from "@/app/_services/project-service"

export default function ProjectPage({ params }) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.docId;

  const { user } = useUserAuth();
  const router = useRouter();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      console.log("Redirecting to login...");
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const loadProject = async () => {
      if (!user) {
        console.log("Waiting...");
        return;
      }

      if (!user.docId || !projectId) {
        console.error("Missing docID:", {
          userDocId: user.docId,
          projectId,
        });
        setIsLoading(false);
        return;
      }

      try {
        const projectData = await getProjectByDocId(user.docId, projectId);
        const tasksData = await getTasks(user.docId, projectId)

        setProject(projectData);
        handleSetTasks(tasksData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [user, projectId]);

  async function handleSetTasks(updatedTasks) {
    // console.log(updatedTasks);
    setTasks(updatedTasks);
    try {

      if (allTasksCompleted(updatedTasks)) {
        await updateProjectStatus(user.docId, projectId, true);
      } else {
        await updateProjectStatus(user.docId, projectId, false);
      }
    } catch (error) {
    }
  }

  function handleAddTask(newTask) {
    setTasks((prevTask) => [...prevTask, newTask]);
  }

  function allTasksCompleted(tasks) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].isCompleted === false) {
        return false;
      }
    }
    return true;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <Image
          src="/my-project-tracker-logo.png"
          alt="Description of my image"
          width={200}
          height={200}
        />
        <Spinner />
        <p className="animate-pulse text-sm text-gray-500">
          Loading Project...
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold">Project not found</p>
        <p className="text-gray-500">
          Looking for ID:{" "}
          <span className="rounded bg-gray-100 px-2 py-1">{projectId}</span>
        </p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="p-4">
        <div className="mb-4">
          <Button variant="outline" onClick={() => router.back()}>
            <span>←</span> Back to Home
          </Button>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full md:w-1/4 lg:w-1/5">
            <ProfileCard
              user={user}
              handleAddProject={null}
              handleAddTask={handleAddTask}
              project={project}/>
          </div>

          {/* Tasks Card Area */}
          <div className="flex-1">
            <ProjectStats tasks={tasks}/>
            <TaskCardDisplay tasks={tasks} setTasks={handleSetTasks} user={user} projectId={projectId}/>
          </div>
        </div>
      </div>
    </div>
  );
}
