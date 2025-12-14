"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import TaskForm from "./task-form";

/**

@author Nick Brunet
@coauthers ...
@description Component card for prompting task creation form

@date_created December 13th, 2025

*/

export default function TaskCardNew({ user, handleAddTask }) {
	/* 
	  Use States 
	*/
	const [taskName, setTaskName] = useState("");
	const [taskDescription, setTaskDescription] = useState("");
	const [dueDateRange, setDueDateRange] = useState({
		from: new Date(),
		to: new Date(),
	});

	/* 
	  Main Component 
	*/
	return (
		<Card className="w-full text-center">
			{/* Card header for new task description */}
			<CardHeader>
				<CardTitle>New Task</CardTitle>
				<CardDescription>
					Click button to create a task for this project view
				</CardDescription>
			</CardHeader>

			{/* Card content for new task dialog button and form popup */}
			<CardContent className="flex w-full justify-center gap-4">
				<TaskForm
					user={user}
					taskName={taskName}
					setTaskName={setTaskName}
					taskDescription={taskDescription}
					setTaskDescription={setTaskDescription}
					dueDateRange={dueDateRange}
					setDueDateRange={setDueDateRange}
					handleAddTask={handleAddTask}
				/>
			</CardContent>
		</Card>
	);
}
