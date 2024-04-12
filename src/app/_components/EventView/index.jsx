
'use client'
import styles from './styles.module.css'
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
import { Pencil, X, Save, Plus, MapPin, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { DialogDescription } from '@radix-ui/react-dialog'
import Status from '../Status'
import Link from "next/link";


// const FormSchema = z.object({
//     title: z.string().min(2, {
//         message: "Tουλάχιστον 2 χαρακτήρες.",
//     }),
//     description: z.string().min(2, {
//         message: 'Tουλάχιστον 2 χαρακτήρες.'
//     })
// })




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
        // resolver: zodResolver(FormSchema),
        defaultValues: {
            title: event.title,
            description: event.description,
        },
    })


    useEffect(() => {
        console.log('event')
        console.log(event)
        form.reset({
            ...event
        })
    }, [event])




    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        <Status status={event?.ACTSTATUS} />
                    </DialogTitle>
                    <DialogDescription className='text-xs'>
                        <div className={styles.icon}>
                            <Clock  />
                            <span>
                            {event.FROMDATE.split(' ')[0]}  {event.FROMDATE.split(' ')[1]} - {event.FINALDATE.split(' ')[1]}
                            </span>
                        </div>
                        <Link
                            className={`${styles.icon} ${styles.link}`}  
                            target="_blank"
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.TADDRESS)},${encodeURIComponent(event.TZIP)}`} >
                            <MapPin /> {event.TADDRESS}
                        </Link>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="w-full space-y-4">
                        <TextInput
                            control={form.control}
                            label={'Πελάτης'}
                            name="TNAME"
                            disabled={state.disabled}
                        />
                        <TextInput
                            control={form.control}
                            label={'Περιγραφή'}
                            name="REMARKS"
                            disabled={state.disabled}
                        />
                        <TextInput
                            control={form.control}
                            label={'Σχόλιο'}
                            name=""
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



