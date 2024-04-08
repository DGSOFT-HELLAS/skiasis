
'use client'
import styles from './styles.module.css'
import { Button } from "@/components/ui/button"
import DateTimePicker from '../DateTimePicker'
import { TextInput } from '../Inputs/TextInput';
import { Form, } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Pencil, X, Save, Plus, MoveLeft } from 'lucide-react';
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
        console.log(event)
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
            <Button className="bg-muted-foreground mb-4">
                <MoveLeft className='h-4 w-4 mr-2' />
                Πίσω
            </Button>
            <div className={styles.details}>
                <h1 className={styles.title}>Διόρθωση Ραντεβού</h1>
                <Status fontSize={'14px'} status={event.ACTSTATUS} />
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className={styles.grid}>
                    <TextInput
                        control={form.control}
                        label={'Πελάτης'}
                        name="TNAME"
                    />
                    <TextInput
                        control={form.control}
                        label={'Τηλέφωνο'}
                        name="TPHONE01"
                    />
                </div>
                <div className={styles.grid}>
                    <TextInput
                        control={form.control}
                        label={'Επισήμανση'}
                        name="REMARKS"
                    />
                    <TextInput
                        control={form.control}
                        label={'Σχόλια'}
                        name="COMMENTS"
                    />
                </div>
                <div className={styles.gridΤhree}>
                    <TextInput
                        control={form.control}
                        label={'Διεύθυνση'}
                        name="TADDRESS"
                    />
                    <TextInput
                        control={form.control}
                        label={'Περιοχή'}
                        name="TDISTRICT"
                    />
                    <TextInput
                        control={form.control}
                        label={'ΤΚ'}
                        name="TZIP"
                    />
                </div>
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



