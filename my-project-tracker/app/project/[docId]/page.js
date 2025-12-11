"use client";

import { useUserAuth } from "@/app/_utils/auth-context";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { getProjectByDocId } from "@/app/_services/project-service";
import ProjectCard from "@/components/custom/project-card";
import Header from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import ProfileCard from "../../../components/custom/profile-card";

export default function ProjectPage({ params }) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.docId;

  const { user } = useUserAuth();
  const router = useRouter();

  const [project, setProject] = useState(null);
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
        const data = await getProjectByDocId(user.docId, projectId);
        setProject(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [user, projectId]);

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <Image
          src="/my-project-tracker-logo.png"
          alt="Description of my image"
          width={200}
          height={200}
          objectFit="contain"
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
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold">Project not found</p>
        <p className="text-gray-500">
          Looking for ID:{" "}
          <span className="rounded bg-gray-100">{projectId}</span>
        </p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="h-max-[85vh] min-h-screen">
      <Header />
      <div className="m-3 w-full">
        <Button variant="outline" className="" onClick={() => router.back()}>
          <span>←</span> Back to Projects
        </Button>
      </div>
      <div className={"m-4 flex gap-4"}>
        <div className="h-full w-1/5">
          <ProfileCard user={user} />
        </div>
        <div className="w-full gap-4">
          <ProjectCard project={project} />
        </div>
      </div>
    </div>
  );
}
