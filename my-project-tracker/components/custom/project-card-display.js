"use client";

import {Button} from "@/components/ui/button"

import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Image from "next/image"
import {Card} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useState, useEffect} from "react";
import {columns} from "../../app/project/columns";
import {DataTable} from "../../app/project/data-table";

import {getProjects} from "@/app/_services/project-service";
/*
Components examples were examined and modified to
fit development needs from the following urls:

1. https://ui.shadcn.com/docs/components/dialog
2.
*/

export default function ProjectCardDisplay({ userId }) {

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // const effectiveUserId = "fgD89sGZ8wDVxEf0urpy";


    useEffect(() => {
        const loadProjects = async () => {
            if (!userId) {
                console.log("User Id was not provided");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const projects = await getProjects(userId);
                setProjects(projects);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        };

        loadProjects();
    }, [userId])

    return (
        <div className="project-card-display flex flex-col w-full min-h-screen">
            <div className={"border w-full h-3/4 rounded-lg p-2"}>
                <div className="flex flex-row gap-2 justify-between items-center mb-2">
                    <p className={"text-2xl p-2"}>Projects</p>

                    <div className={"flex flex-row gap-2 items-center shrink-0"}>
                        <div className={"flex flex-row w-fit h-fit p-2 border rounded-lg"}>
                            <Image
                                src={"../search.svg"}
                                alt="Search Bar"
                                height={28}
                                width={28}
                            />
                            <Input placeholder={"Search by the project title..."}
                                   className={"ml-2 w-full h-full focus:outline-none"}/>
                        </div>
                        <button className={"w-fit h-fit border rounded-md hover:shadow-md"}>
                            <Image
                                src={"../filter.svg"}
                                alt="Filter Button"
                                height={40}
                                width={40}
                            />
                        </button>
                    </div>

                </div>
                <ScrollArea className={"w-full h-[93%] border rounded-lg overflow-hidden flex-1"}>
                    {isLoading ? (
                        <div className="p-4 text-center">Projects Loading...</div>
                    ) : (
                        <DataTable columns={columns} data={projects}/>
                    )}
                    <div className={"border w-full"}></div>

                </ScrollArea>
            </div>
        </div>
    )
}