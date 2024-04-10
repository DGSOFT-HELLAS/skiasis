
'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { TextInput } from '../Inputs/TextInput';
import { Form, } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { TextArea } from '../Inputs/TextArea';
import { Pencil, X, Save, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { DialogDescription } from '@radix-ui/react-dialog'
import Status from '../Status'

const FormSchema = z.object({
    title: z.string().min(2, {
        message: "Tουλάχιστον 2 χαρακτήρες.",
    }),
    description: z.string().min(2, {
        message: 'Tουλάχιστον 2 χαρακτήρες.'
    })
})




export default function ViewEvent({
    open,
    setOpen,
    event,
}) {
    const router = useRouter();
    const [state, setState] = useState({
        edit: false,
        disabled: true
    })
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: event.title,
            description: event.description,
        },
    })


    useEffect(() => {
       
        form.reset({
            title: event.title,
            description: event.description,
            client: event.extendedProps?.trdr
        })
    }, [event])




    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        <Status status={event?.extendedProps?.status} />
                    </DialogTitle>
                    <DialogDescription className='text-xs'>
                        {event.start.split(' ')[0]}    {event.start.split(' ')[1]} - {event.end.split(' ')[1]}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="w-full space-y-4">
                        <TextInput
                            control={form.control}
                            label={'Πελάτης'}
                            name="client"
                            disabled={state.disabled}
                        />
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
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button variant="outline"  >
                                    <X className="h-4 w-4" />
                                </Button >
                            </DialogClose>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault()
                                    router.push(`/dashboard/edit-event/${event.extendedProps.id}`)
                                }}
                                variant="outline"   >
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button type="submit">
                                <Plus className="h-4 w-4 mr-2" />
                                Νέα Προσφορά
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}



