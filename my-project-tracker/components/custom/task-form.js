import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import { Calendar } from "@/components/ui/calendar";
import { CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import Image from "next/image";
import Task from "@/classes/task";

/**

@author Nick Brunet
@coauthers ...
@description Component for handling task creation form

@date_created December 13th, 2025

*/

export default function TaskForm({
	user,
	taskName,
	setTaskName,
	taskDescription,
	setTaskDescription,
	dueDateRange,
	setDueDateRange,
	handleAddTask,
	project
}) {
	/* 
	  Use states 
	*/
	const [creationLoading, setCreationLoading] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);

	/* 
	  Constants 
	*/
	const tooltipIconSize = 20;

	/* 
	  Functions 
	*/
	async function handleCreateTask(e) {
		if (e) e.preventDefault();

		const task = new Task(
			null,
			taskName,
			false,
			dueDateRange.to,
			dueDateRange.from,
			taskDescription
		);

		setCreationLoading(true);

		await user.createNewTask(project, task);

		setCreationLoading(false);
		setDialogOpen(false);

		console.log("Created new task! docId: " + task.docId);

		if (handleAddTask) {
			handleAddTask(task);
		}
	}

	function handleTaskName(event) {
		setTaskName(event.target.value);
	}

	function handleTaskDescription(event) {
		setTaskDescription(event.target.value);
	}

	function handleDateSelect(dateRange) {
		setDueDateRange({
			from: new Date(),
			to: dateRange.to,
		});
	}

	function dateToString(date) {
		// A regex split expression that splits at ' xx:' where xx is a number
		return `${date}`.split(/ \d{2}:/)[0];
	}

	/* 
	  Main component 
	*/

	return (
		<Dialog open={dialogOpen}>
			<form onSubmit={handleCreateTask}>
				{/* Main button trigger to prompt dialog */}
				<DialogTrigger asChild>
					<Button
						onClick={() => setDialogOpen(true)}
						className={"mx-auto overflow-auto"}
					>
						Create New Task
					</Button>
				</DialogTrigger>

				{/* Dialog popup container */}
				<DialogContent className="p-3">
					{/* Dialog header container */}
					<DialogHeader>
						<DialogTitle>Task Creation Form</DialogTitle>
						<DialogDescription>
							Make sure to fill in all input fields to create the task!
						</DialogDescription>
					</DialogHeader>

					{/* Dialog content container */}
					<div className="grid gap-4">
						{/* Details content container: includes task name input and task description */}
						<CardTitle>Details</CardTitle>

						{/* Task name container */}
						<InputGroup className="">
							<InputGroupInput
								placeholder="Task name..."
								value={taskName}
								onChange={handleTaskName}
							/>
							<InputGroupAddon align="inline-end">
								<Tooltip>
									<TooltipTrigger asChild>
										<Image
											alt="info"
											src="/info.svg"
											width={tooltipIconSize}
											height={tooltipIconSize}
										/>
									</TooltipTrigger>
									<TooltipContent>
										<p>Name Length: 5-50 characters</p>
										<p>Cannot already be a task name</p>
									</TooltipContent>
								</Tooltip>
							</InputGroupAddon>
						</InputGroup>

						{/* Task description container */}
						<InputGroup className="">
							<InputGroupTextarea
								placeholder="Task description..."
								maxLength={150}
								value={taskDescription}
								onChange={handleTaskDescription}
							/>
							<InputGroupAddon align="inline-end">
								<Tooltip>
									<TooltipTrigger asChild>
										<Image
											alt="info"
											src="/info.svg"
											width={tooltipIconSize}
											height={tooltipIconSize}
										/>
									</TooltipTrigger>
									<TooltipContent>Description Length: 10-150</TooltipContent>
								</Tooltip>
							</InputGroupAddon>
						</InputGroup>

						{/* Timeline container: select task timeline approximation */}
						<CardTitle>Timeline</CardTitle>

						{/* Task timeline container */}
						<div className="flex flex-col items-center">
							{/* Read only start and end date inputs for task timeline */}
							<div className="flex w-full gap-2">
								<InputGroup className="">
									<InputGroupInput
										placeholder={dateToString(dueDateRange.from)}
										readOnly
									/>
									<InputGroupAddon align="inline-end">
										<Image
											alt="calendar"
											src="/calendar.svg"
											width={tooltipIconSize}
											height={tooltipIconSize}
										/>
									</InputGroupAddon>
								</InputGroup>
								<InputGroup className="">
									<InputGroupInput
										placeholder={dateToString(dueDateRange.to)}
										readOnly
									/>
									<InputGroupAddon align="inline-end">
										<Image
											alt="calendar"
											src="/calendar.svg"
											width={tooltipIconSize}
											height={tooltipIconSize}
										/>
									</InputGroupAddon>
								</InputGroup>
							</div>

							{/* Calendar component to select task timeline */}
							<Calendar
								mode="range"
								defaultMonth={dueDateRange?.from}
								selected={dueDateRange}
								onSelect={handleDateSelect}
								numberOfMonths={2}
							/>
						</div>
					</div>

					{/* Dialog footer for canceling and task creation handling */}
					<DialogFooter>
						<Button type={"button"} onClick={() => setDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleCreateTask}>
							{creationLoading ? <Spinner /> : <></>}Create
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
