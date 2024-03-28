
'use client'
import styles from './styles.module.css'
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Calendar } from 'lucide-react';
import { TextInput } from '../Inputs/TextInput';
import {Form,} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { TextArea } from '../Inputs/TextArea';
import { Pencil, X, Save, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import DateTimePicker from '../DateTimePicker';



const FormSchema = z.object({
    title: z.string().min(2, {
        message: "Ο Τίτλος πρέπει να έιναι τουλάχιστον 2 χαρακτήρες.",
    }),
    description: z.string().min(2, {
        message: 'please '
    })
})




export default function ViewEvent({ 
    open, 
    setOpen, 
    event, 
    handleEvent,
    startDate,
    endDate,
}) {

    const [state, setState] = useState({
        edit: false,
        disabled: true
    })
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title:  event.title,
            description: event.description
        },
    })

    
    useEffect(() => {
        form.reset({
            title: event.title,
            description: event.description
        })
    }, [event])

    const handleEdit = () => {
        setState(prev => ({
            ...prev,
            edit: !prev.edit,
            disabled: !prev.disabled
        }))
    }
    const onSubmit = (data) => {
        console.log('submit')
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {event.start.split('T')[0]}
                        </DialogTitle>
                   
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                        <TextInput
                            control={form.control}
                            label={'Τιτλος'}
                            name="title"
                            disabled={state.disabled}
                        />
                        <TextArea
                            control={form.control}
                            label={'Περιγραφή'}
                            name="description"
                            disabled={state.disabled}
                        />
                        {state.edit ? (
                           <>
                              <DateTimePicker 
                             label="Hμερ/'Ώρα Έναρξης ( 24-hour)"
                             name="start"
                             date={startDate}
                             handleEvent={handleEvent}
                         />
                         <DateTimePicker 
                             label="Hμερ/'Ώρα Έναρξης ( 24-hour)"
                             name="start"
                             date={endDate}
                             minDate={startDate}
                             handleEvent={handleEvent}
                         />
                           
                           </>
                        ) : null}
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button variant="outline"  >
                                    <X className="h-4 w-4" />
                                </Button >
                            </DialogClose>
                            <Button
                                onClick={handleEdit}
                                variant="outline"   >
                                <Pencil className="h-4 w-4" />
                            </Button>
                            
                            {!state.edit ? (
                                <Button  type="submit">
                                <Plus className="h-4 w-4 mr-2" />
                                Νέα Προσφορά
                            </Button>
                            ) : (
                                <Button  type="submit">
                                    <Save className="h-4 w-4 mr-2" />
                                    Aποθήκευση
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}

