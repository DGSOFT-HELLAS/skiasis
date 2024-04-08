
'use client'
import styles from './styles.module.css'
import { Button } from "@/components/ui/button"
import { isBefore } from 'date-fns'
import DateTimePicker from '../DateTimePicker'
import { TextInput } from '../Inputs/TextInput';
import { Form, } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { TextArea } from '../Inputs/TextArea';
import { Pencil, X, Save, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import Status from '../Status'


const FormSchema = z.object({
    TNAME: z.string().min(2, {
        message: "Tουλάχιστον 2 χαρακτήρες.",
    }),


})






export default function EventEdit({
    event,
}) {
    const [state, setState] = useState({
        start: event.FROMDATE,
        end: event.FINALDATE,
    })
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: event,
    })
    const [calendarError, setCalendarError] = useState(null)




    useEffect(() => {
        form.reset(event)
    }, [event])



    




    //CUSTOM LOGIN ONLY FOR THE DATE TIME COMPONETS THAT ARE NOT WRAPPED INSIDE REACT-HOOK-FORM
    const handleEvent = (name, value) => {
        setState(prev => ({ ...prev, [name]: value }))
    }


    const onSubmit = (data) => {
        // SEND THE FINAL REQUEST TO UPDATE SOFTONE:
        console.log({
            ...data,
            start: state.start,
            end: state.end

        })

    }



    return (

        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <TextInput
                    control={form.control}
                    label={'Πελάτης'}
                    name="TNAME"
                />
                <TextInput
                    control={form.control}
                    label={'Τιτλος'}
                    name="REMARKS"
                />
                <TextInput
                    control={form.control}
                    label={'Τιτλος'}
                    name="COMMENTS"
                />
                <TextInput
                    control={form.control}
                    label={'Τιτλος'}
                    name="TADDRESS"
                />
                <TextInput
                    control={form.control}
                    label={'Τιτλος'}
                    name="TDISTRICT"
                />
                {/* <TextArea
                            control={form.control}
                            label={'Περιγραφή'}
                            name="description"
                            disabled={state.disabled}
                        /> */}

                <DateTimePicker
                    label="Hμερ/'Ώρα Έναρξης"
                    name="start"
                    date={state.start}
                    endDate={state.end}
                    handleEvent={handleEvent}
                    setCalendarError={setCalendarError}
                    calendarError={calendarError}
                />

                <DateTimePicker
                    label="Hμερ/'Ώρα Λήξης"
                    name="end"
                    date={state.end}
                    handleEvent={handleEvent}
                    setCalendarError={setCalendarError}

                />
                <Button type="submit">
                    <Save />
                    Αποθήκευση
                </Button>
            </form>
        </Form>
    )
}



