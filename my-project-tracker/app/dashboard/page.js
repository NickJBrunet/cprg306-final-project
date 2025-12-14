"use client";

import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/custom/header";

import ProfileCard from "@/components/custom/profile-card";
import ProjectCardDisplay from "@/components/custom/project-card-display";

import { getProjects } from "@/app/_services/project-service";
import ProjectStats from "@/components/custom/projectstats";

/**
 * @author Nick Brunet
 * @coauthers Firaol Ahmed
 * @description main page route for user projects. Fetches data for the stats and table components.
 * @date_created December 2nd, 2025
 * @modified December 8th, 2025
 */

export default function Page() {
  const router = useRouter();
  const { user, firebaseSignOut } = useUserAuth();

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function toLogin() {
    router.replace("/");
  }

  async function logout() {
    // Sign out of Firebase
    await firebaseSignOut();
  }

  function handleAddProject(newProject) {
    setProjects((prevProject) => [...prevProject, newProject]);
  };

  useEffect(() => {
    if (!user) {
      toLogin();
    }
  }, [user]);

  useEffect(() => {
    const loadProjects = async () => {
      if (!user || !user.docId) {
        console.log("doc id was not provided");
        return;
      }

      try {
        setIsLoading(true);
        const data = await getProjects(user.docId);
        setProjects(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [user]);

  return (
    <div>
      {/* Wrapper Container */}
      {user ? (
        <div className="min-h-screen">
          <Header />
          <div className="m-4 flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/4 lg:w-1/5">
              <ProfileCard 
                user={user} 
                logout={logout} 
                handleAddProject={handleAddProject} 
                handleAddTask={null} 
                project={null}
              />
            </div>

            <div className="flex flex-1 flex-wrap justify-center gap-4">
              <ProjectStats projects={projects} handleAddProject={handleAddProject} />
              <ProjectCardDisplay projects={projects} />
            </div>
          </div>
        </div>
      ) : (
        <p>error</p>
      )}
    </div>
  );
}
