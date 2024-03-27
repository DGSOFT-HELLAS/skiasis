
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"
import DateTime from "./timepicker";

import SelectColor from "../SelectColorTag";
export default function AddEvent({
	open,
	setOpen,
	selectedDate,
	handleEvent,
	event,
	handleSubmit
}) {


	const [select, setSelect] = useState({
		value: "red",
		label: "red"
	})

	const handleInput = (e, extendedProps = false) => {
		const { name, value } = e.target;
		handleEvent(name, value, extendedProps);

	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="mb-4">Προσθήκη Event</DialogTitle>
					<div className="pb-2">
						<Label htmlFor="email">Επιλογή Tag</Label>
						<SelectColor onClick={handleInput} />
					</div>
					<div className="pb-2">
						<Label htmlFor="email">Tίτλος</Label>
						<Input
							onChange={handleInput}
							value={event.title}
							type="email"
							id="email"
							name="title"
						/>
					</div>
					<div className="pb-2" >
						<Label htmlFor="message">Λεπτομέριες</Label>
						<Textarea
							name="description"
							placeholder="Δώστε μια περιγραφή για το event."
							id="message"
							onChange={(e) => handleInput(e)}
						/>
					</div>
					
					< DateTime
						label="Hμερ/'Ώρα Έναρξης ( 24-hour)"
						name="start"
						selectedDate={selectedDate}
						handleEvent={handleEvent}
					/>
					< DateTime
						label="Hμερ/'Ώρα Λήξης ( 24-hour)"
						name="end"
						selectedDate={selectedDate}
						handleEvent={handleEvent}
					/>

				</DialogHeader>
				<DialogFooter className="sm:justify-start">
					<Button onClick={handleSubmit} type="button">
						Αποθήκευση
					</Button>
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Κλέισιμο
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

