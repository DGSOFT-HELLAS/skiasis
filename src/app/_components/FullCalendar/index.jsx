'use client'
//STYLES:
import './styles.css'
//REACT NODES:
import React, { useState, useEffect,  useRef } from 'react'
//FULL CALENDAR
import elLocale from '@fullcalendar/core/locales/el';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction"
//CUSTOM EVENTS:
import AddEvent from './addEvent';
import axios from 'axios'
import { useSession } from "next-auth/react";
import ViewEvent from '../ViewEvent';
import {redirect} from 'next/navigation'
import { format } from 'date-fns';

export default function RFullCalendar({}) {
	const { data: session} = useSession({
		required: true,
		onUnauthenticated() {
		  redirect("/login");
		},
	  });

	const calendarRef = useRef(null);
	const [events, setEvents] = useState()
	const [state, setState] = useState({
		loading: false,
		addEvent: false,
		start: '20240101',
		end: '20241230',
		event: {
			start: '',
			end: '',
			title: '',
			description: '',
			extendedProps: {
			}
		}
	})
	

	
	//FETCH DATA FROM THE SERVER:
	const handleFetch = async () => {
		const {data} = await axios.post('/api/calendarEvents', {
			start: state.start,
			end: state.end
		})
		
		setEvents(data.events)
	
	}

	useEffect(() => {
		handleFetch()
	}, [])


	

	
	//Handle to close the Edit form popup
	const handleCloseEditForm = (info) => {
		setState(prev => ({ ...prev, editEvent: false }))
	}
	//PASS DATA TO THE EDIT FORM:
	const handleEdit = (info) => {
		setState(prev => ({ 
			...prev, 
			editEvent: true,
			event: {
				...prev.event,
				start: info.event.startStr.split(':00+')[0],
				end: info.event.endStr.split(':00+')[0],
				title: info.event.title,
				description: info.event.extendedProps.description,
				extendedProps: info.event.extendedProps
			}
		}))
	};
	//CLOSE THE ADD EVENT:
	const handleCloseAddEvent = () => {
		setState(prev => ({ ...prev, addEvent: false }))
	}


	//ADD A NEW EVENT AFTER CLEARING THE EVENT ON THE STATE:
	const handleSelectAllow = (event) => {
		let start;
		let end;
		if(event.allDay) {
			start = `${event.startStr}T08:00`
			end = `${event.startStr}T10:00`
		}

		if(!event.allDay) {
			start = `${event.startStr}`
			end = `${event.endStr}`
		}

		setState(prev => ({ ...prev, addEvent: true, 
			event: {
				start: start,
				end: end
			} 
		}
		))
	};
	//ALTER THE STATE OF THE EVENT THAT WE ADDED:
	const handleEvent = (name, value, extendedProps) => {
	
		if (extendedProps) {
			setState(prev => ({ ...prev, event: { ...prev.event, extendedProps: { ...prev.event.extendedProps, [name]: value } } }))
			return;
		}
		setState(prev => ({ ...prev, event: { ...prev.event, [name]: value } }))

	}
	//FINAL SUBMIT OF THE EVENT:
	const handleAddSubmit = async () => {
		//add event to softone
		// console.log('event')
		// console.log(state.event)
	}


	async function handleMonthChange(payload) {
		setTimeout(() => {
			calendarRef?.current?.getApi().updateSize();
		  }, 0);
		
		setState(prev => ({ ...prev, start: payload.startStr, end: payload.endStr, loading: true }))
	}
	return (
		<div className="wrapper">
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin,]}
				selectMirror={true}
				headerToolbar={{
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,listWeek'
				}}
				events={events}
				initialView='dayGridMonth'
				editable={true}
				//EDIT EVENT:
				eventClick={handleEdit}
				selectable={true}
				//ADD EVENT:
				selectAllow={(e) => handleSelectAllow(e)}
				locale={elLocale}
				dayMaxEventRows={3}
				datesSet={handleMonthChange}
				 ref={calendarRef}
				contentHeight={90}
				height={'100vh'}
				lazyFetching={true}
			/>
			<ViewEvent
				event={state.event}
				open={state.editEvent}
				setOpen={handleCloseEditForm}
				startDate={state.event.start}
				endDate={state.event.end}
				handleEvent={handleEvent}/>
			<AddEvent
				open={state.addEvent}
				setOpen={handleCloseAddEvent}
				handleEvent={handleEvent}
				event={state.event}
				handleSubmit={handleAddSubmit}
				startDate={state.event.start}
				endDate={state.event.end}
				/>
		</div>
	)
}





