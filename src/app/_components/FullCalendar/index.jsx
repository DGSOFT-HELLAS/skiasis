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
		editEvent: false,
		addEvent: false,
		start: '20240101',
		end: '20241230',
		event: {},
	})
	
	// useEffect(() => {
	// 	console.log('state')
	// 	console.log(state.event)
	// }, [state.event])


	// useEffect(() => {
	// 	console.log('events')
	// 	console.log(events)
	// }, [events])

	

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
	const handleCloseForm = (info) => {
		setState(prev => ({ ...prev, editEvent: false }))
	}
	//PASS DATA TO THE EDIT FORM:
	const handleEdit = (info) => {
		setState(prev => ({ 
			...prev, 
			editEvent: true,
			event: {
				...prev.event,
				start: info.event.startStr,
				end: info.event.endStr,
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
	const handleAddEvent = (event) => {
		const start = `${event.dateStr}T09:00`
		const end = `${event.dateStr}T09:30`
		setState(prev => ({ ...prev, addEvent: true, event: {
			start: start,
			end: end
		} }))
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
				dateClick={(e) => handleAddEvent(e)}
				selectMirror={true}
				headerToolbar={{
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,listWeek'
				}}
				events={events}
				initialView='dayGridMonth'
				editable={true}
				eventClick={handleEdit}
				selectable={true}
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
				setOpen={handleCloseForm}
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





