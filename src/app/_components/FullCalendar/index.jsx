'use client'
//STYLES:
import './styles.css'
import styles from './calendar.module.css'
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
import EditEvent from './editEvent'
import AddEvent from './addEvent';
import axios from 'axios'
import { getCookie, deleteCookie } from 'cookies-next';
import { useSession } from "next-auth/react";


export default function RFullCalendar({}) {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
		  redirect("/login");
		},
	  });
	  console.log('client session')
	  console.log(session)
	
	const calendarRef = useRef(null);

	const [events, setEvents] = useState()

	const [state, setState] = useState({
		loading: false,
		editEvent: false,
		addEvent: false,
		start: '20230101',
		end: '20241230',
		event: {
			title: 'Test title',
			start: '2024-03-22 12:00:00',
			end: '2024-03-22 12:00:00',
			extendedProps: {
				
			},
		}
	})
	
	useEffect(() => {
		console.log('state')
		console.log(state.start)
		console.log(state.end)
	}, [state.start, state.end])

	

	const handleFetch = async () => {
		const {data} = await axios.post('/api/calendarEvents', {
			start: state.start,
			end: state.end
		})
		console.log(data.events.length)
		setEvents(data.events)
	
	}

	useEffect(() => {
		handleFetch()
	}, [])


	const handleOpenAddEvent = () => {
		setState(prev => ({ ...prev, addEvent: false }))
	}


	//Handle to close the Edit form popup
	const handleCloseForm = (info) => {
		setState(prev => ({ ...prev, editEvent: false }))
	}



	const handleEvent = (name, value, extendedProps) => {

		if (extendedProps) {
			setState(prev => ({ ...prev, event: { ...prev.event, extendedProps: { ...prev.event.extendedProps, [name]: value } } }))
			return;
		}
		setState(prev => ({ ...prev, event: { ...prev.event, [name]: value } }))

	}




	const handleAddDate = (event) => {
		setState(prev => ({ ...prev, addEvent: true, event: { ...prev.event, date: event.dateStr } }))
	};


	const handleAddSubmit = async () => {
		setEvents(prev => ([...prev, state.event]))
		const { data } = await axios.post('/api/calendarEvents', {
			title: state.event.title,
			start: state.event.start,
			end: state.event.end,
			backgroundColor: state.event.backgroundColor,
			description: state.event.extendedProps.description
		})
		console.log('data')
		console.log(data)
		//Clears previous state of the event and closes the popup
		setState(prev => ({ ...prev, addEvent: false, event: { title: '', start: '', end: '', extendedProps: { description: '' } } }))

	}


	const handleEdit = (info) => {
		setState(prev => ({ ...prev, editEvent: true }))
		const calendarApi = info.view.calendar;
		const event = calendarApi.getEventById(info.event.id);
		setState(prev => ({
			...prev,
			event: {
				title: event.title,
				start: event.start,
				end: event.end,
				extendedProps: {
					description: event.extendedProps.description
				}
			}
		}
		))

	};


	// const renderEventContent = (eventInfo) => {
	
	// 	if (eventInfo.view.type === 'listWeek') {
	// 		return (
	// 			<div className='custom-event-wrapper'>
	// 				<div className='custom-event-inner'>
	// 					<div className='custom-event-time'>{eventInfo.timeText}</div>
	// 					<div className='custom-event-title'>{eventInfo.event.title}</div>
	// 					{/* <div>
	// 						<button>Custom Button</button>
	// 					</div> */}
	// 				</div>
	// 			</div>
	// 		);
	// 	}
	
	// 	if (eventInfo.view.type === 'dayGridMonth') {
	// 		return (
	// 			<div className='month_wrapper'>
	// 				<div className='month_inner'>
	// 					<div className='custom-event-time'>{eventInfo.timeText}</div>
	// 					<div className='month_title'>{eventInfo.event.title}</div>
	// 				</div>
	// 			</div>
	// 		);
	// 	}
	
	// 	// Default rendering for other view types
	// 	return (
	// 		<div className='custom-event-wrapper'>
	// 			<div className='custom-event-inner'>
	// 				<div className='custom-event-time'>{eventInfo.timeText}</div>
	// 				<div className='custom-event-title'>{eventInfo.event.title}</div>
	// 			</div>
	// 		</div>
	// 	);
	// };

	async function handleMonthChange(payload) {
		setTimeout(() => {
			calendarRef?.current?.getApi().updateSize();
		  }, 0);
		setState(prev => ({ ...prev, start: payload.startStr, end: payload.endStr, loading: true }))
	  }
	return (
		<div className={styles.wrapper}>
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin,]}
				dateClick={(e) => handleAddDate(e)}
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
			<EditEvent
				event={state.event}
				open={state.editEvent}
				setOpen={handleCloseForm}
			/>
			<AddEvent
				open={state.addEvent}
				setOpen={handleOpenAddEvent}
				handleEvent={handleEvent}
				event={state.event}
				handleSubmit={handleAddSubmit}
				selectedDate={state.event.date} />
		</div>
	)
}





