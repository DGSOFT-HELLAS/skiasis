
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Label } from '@/components/ui/label'
import styles from './styles.module.css'
import { useEffect, useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { el } from 'date-fns/locale';
import { format } from "date-fns";
import { isBefore } from 'date-fns';

export default function DateTimePicker({
    label,
    date,
    name,
    endDate,
    handleEvent,
    calendarError,
    setCalendarError
}) {
   
    const [state, setState] = useState({
        date: date.split(' ')[0],
        time: date.split(' ')[1],
        hour: date.split(' ')[1].split(':')[0],
        minutes: date.split(' ')[1].split(':')[1]
    })

    useEffect(() => {
        let date = `${state.date} ${state.hour}:${state.minutes}`
        if(isBefore(endDate, date)) {
            setCalendarError && setCalendarError('Η ημερομηνία λήξης δεν μπορεί να είναι πριν την ημερομηνία έναρξης')
        } else {
            setCalendarError && setCalendarError(null)
        }
        handleEvent(name, `${state.date} ${state.hour}:${state.minutes}`)
    }, [state.date, state.hour, state.minutes, ])

   

    const handleSelectDate = (e) => {
        let formated = format(e, "yyyy-MM-dd");
        setState(prev => ({ ...prev, date: formated }))
    }

  


    const handleSelectTime = (name, value) => {
        setState(prev => ({ ...prev, [name]: value < 10 ? `0${value}` : value.toString()}))
    }


    return (
        <div className="w-full pb-2 ">
            <Label className={calendarError && `${styles.labelError}` } htmlFor="message">{label}</Label>
            <div className={styles.container}>
                <Popover>
                    <PopoverTrigger asChild>
                        <div className={styles.input}>
                            <CalendarIcon />
                            <span>
                                {state.date}
                            </span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 mt-4" align="start">
                        <Calendar
                            mode="single"
                            locale={el}
                            onSelect={handleSelectDate}
                            selected={new Date(state.date)}
                        />
                    </PopoverContent>
                </Popover>
                <Popover modal={true} >
                    <PopoverTrigger asChild>
                        <div className={styles.input}>
                            <Clock />
                            <span>
                                {state.hour}:{state.minutes}
                            </span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className={styles.timepickerPopover} align="start">
                            <div className={styles.column}>
                                {hour.map((h, i) => (
                                    <div 
                                        key={i}
                                        onClick={() => handleSelectTime('hour', h)}
                                        className={`${styles.timeItem} ${ h == state.hour ? `${styles.timeItemActive}` : null  }`} >
                                        {h < 10 ? `0${h}` : h}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.column}>
                                {minutes().map((m, i) => (
                                    <div 
                                        key={i} 
                                        onClick={() => handleSelectTime('minutes', m)}
                                        className={`${styles.timeItem} ${ m == state.minutes ? `${styles.timeItemActive}` : null  }`} >
                                        {m < 10 ? `0${m}` : m}
                                    </div>
                                ))}
                            </div>

                    </PopoverContent>
                </Popover>
            </div>
            {calendarError ? <span className={styles.error}>{calendarError}</span> : null}
        </div>
    )
}



const hour = Array.from({ length: 24 }, (_, i) => i);
// const minutes = Array.from({ length: 60 }, (_, i) => );


function minutes() {
    let minutes = []
    for (let i = 0; i < 60; i += 5) {
        minutes.push(i)
    }
    return minutes
}