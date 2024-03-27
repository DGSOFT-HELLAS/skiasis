
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
import { Pencil, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const FormSchema = z.object({
    title: z.string().min(2, {
        message: "Ο Τίτλος πρέπει να έιναι τουλάχιστον 2 χαρακτήρες.",
    }),
    description: z.string().min(2, {
        message: 'please '
    })
})




export default function ViewEvent({ open, setOpen, event, handleEvent }) {

    const [edit, setEdit] = useState(false);
    const [date, setDate] = useState(null)
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: 'custom title',
            description: 'custom description'
        },
    })

    useEffect(() => {
            const date = event.start && format(new Date(event.start), 'dd/MM/yyyy')
            setDate(date)

    }, [])


    const onSubmit = (data) => {
        console.log('submit')
    }
    // const date  = '2024-05-01'
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{event.title}</DialogTitle>
                    <DialogDescription className={styles.calendarDate}>
                        <Calendar />
                        <span> {date}</span>
                        <span> {event.title}</span>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                        {/* <TimePicker /> */}
                        <TextInput
                            control={form.control}
                            label={'Τιτλος'}
                            name="title"
                            disabled={true}
                        />
                        <TextArea
                            control={form.control}
                            label={'Περιγραφή'}
                            name="description"
                            disabled={true}
                        />
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button variant="outline"  >
                                    <X className="h-4 w-4" />
                                </Button >
                            </DialogClose>
                            <Button
                                onClick={() => setEdit(prev => !prev)}
                                variant="outline"   >
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button type="submit">
                                Νέα Προσφορά
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}

