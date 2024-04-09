'use client'
//STYLES:
import styles from './styles.module.css'
//REACT NODES:
import React, { useState, useEffect, useRef } from 'react'
//FULL CALENDAR
import elLocale from '@fullcalendar/core/locales/el';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction"
//CUSTOM EVENTS:
import axios from 'axios'
import { useSession } from "next-auth/react";
import ViewEvent from '../EventView';
import { redirect } from 'next/navigation'
import { format } from 'date-fns';
import Spinner from '../Spinner';



export default function RFullCalendar({ }) {
	const { data: session } = useSession({
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
		editEvent: false,
		start: '2024-01-01 00:00',
		end: '2024-12-31 23:59',
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
		setState(prev => ({ ...prev, loading: true }))
		console.log(state.start, state.end)
		try {
			const { data } = await axios.get(`/api/calendarEvents?start=${state.start}&end=${state.end}`)
			console.log(data.events)
			setEvents(data.events)
			setState(prev => ({ ...prev, loading: false }))
		
		} catch (e) {
			console.log(e)
			setState(prev => ({ ...prev, loading: false }))
		}
	
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
		let start = format(new Date(info.event.startStr), 'yyyy-MM-dd HH:mm')
		let end = format(new Date(info.event.endStr), 'yyyy-MM-dd HH:mm')

		setState(prev => ({
			...prev,
			editEvent: true,
			event: {
				...prev.event,
				start: start,
				end: end,
				title: info.event.title,
				description: info.event.extendedProps.description,
				extendedProps: info.event.extendedProps
			}
		}))
	};
	

	//ADD A NEW EVENT AFTER CLEARING THE EVENT ON THE STATE:
	const handleSelectAllow = (event) => {
		console.log('handle select allow')
		let start;
		let end;
		if (event.allDay) {
			start = `${event.startStr} 08:00`
			end = `${event.startStr} 10:00`
		}

		if (!event.allDay) {
			start = `${event.startStr}`
			end = `${event.endStr}`
		}

		setState(prev => ({
			...prev, 
			addEvent: true,
			editEvent: false,
			event: {
				start: start,
				end: end
			}
		}
		))
	};



	


	async function handleMonthChange(payload) {
		setTimeout(() => {
			calendarRef?.current?.getApi().updateSize();
		}, 0);
		setState(prev => ({ ...prev, start: payload.startStr, end: payload.endStr}))
	}
	return (
		<div>

			<div className={styles.wrapper}>
				{state.loading ? (
					<div className={styles.calendarLoading}>
						<Spinner />
					</div>
				) : null}
				<FullCalendar
					plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin,]}
					headerToolbar={{
						left: 'prev,next today',
						center: 'title',
						right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
					}}
					events={events}
					initialView='dayGridMonth'
					editable={false}
					//EDIT EVENT:
					eventClick={handleEdit}
					selectable={true}
					//ADD EVENT:
					selectAllow={(e) => handleSelectAllow(e)}
					locale={elLocale}
					dayMaxEventRows={3}
					// datesSet={handleMonthChange}
					ref={calendarRef}
					contentHeight={100}
					height={'100vh'}
					
				/>
				<ViewEvent
					event={state.event}
					open={state.editEvent}
					setOpen={handleCloseEditForm}
					startDate={state.event.start}
					endDate={state.event.end}
				/>
				
			</div>
		</div>

	)
}





