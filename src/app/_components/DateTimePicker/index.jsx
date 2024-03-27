
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


export default function DateTimePicker({ 
    label, 
    date, 
    name, 
    handleEvent 
}) {
    const [state, setState] = useState({
      
        date: date.split('T')[0],
        time: date.split('T')[1]
    })




    useEffect(() => {
        // let hour = parseInt(state.hour) < 10 ? `0${state.hour}` : state.hour;
        // let minutes = parseInt(state.minutes) < 10 ? `0${state.minutes}` : state.minutes;
        handleEvent(name, `${state.date} ${state.hour}:${state.minutes}:00`)
    }, [state])


 
    const handleSelectDate = (e) => {
        let formated = format(e, "yyyy-MM-dd");
        setState(prev => ({ ...prev, date: formated }))
    }


    return (
        <>

            <div className="w-full pb-2 ">
                <Label htmlFor="message">{label}</Label>
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
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className={styles.input}>
                                <Clock />
                                <span>
                                    {state.time}
                                </span>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 mt-4" align="start">
                            <div>
                                sefsfsefsef
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

            </div>

        </>
    )
}



