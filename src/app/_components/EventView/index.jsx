
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
import { useForm } from "react-hook-form"
import { Pencil, X, Save, Plus, MapPin, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { DialogDescription } from '@radix-ui/react-dialog'
import Status from '../Status'
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxSingle } from '../Inputs/Checkbox';




export default function ViewEvent({
    open,
    setOpen,
    event,
}) {
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            ...event,
        }
    })


    useEffect(() => {
        form.reset({
            ...event,
            PLACEREDINESS: event.PLACEREDINESS === '1' ? true : false,
            REMOVENOTE: event?.REMOVENOTE?.split('|')[1] || 'Δεν υπάρχει σχόλιο',
            TELESCOPIC: event?.TELESCOPIC?.split('|')[1] || 'Δεν υπάρχει σχόλιο',
        })
    }, [event])


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* <DialogContent className="sm:max-w-md"> */}
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>
                        <Status status={event?.ACTSTATUS} />
                    </DialogTitle>
                    <DialogDescription className='text-xs'>
                        <div className={styles.icon}>
                            <Clock />
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

                <Form

                    {...form}
                >
                    <form className="w-full space-y-4">
                        <div className={styles.form}>
                        <CheckboxSingle
                                control={form.control}
                                label={'Ετοιμότητα Χώρου'}
                                name="PLACEREDINESS"
                            />
                          
                            <TextInput
                                control={form.control}
                                label={'Περιγραφή'}
                                name="REMARKS"
                                disabled={true}
                            />
                            <TextInput
                                control={form.control}
                                label={'Σχόλιο'}
                                name="COMMENTS"
                                disabled={true}

                            />
                            <TextInput
                                control={form.control}
                                label={'Αφαίρεση Υφ. συστημάτων'}
                                name="REMOVENOTE"
                                disabled={true}

                            />
                            <TextInput
                                control={form.control}
                                label={'Ενημ. Τηλεσκοπικού'}
                                name="TELESCOPIC"
                                disabled={true}

                            />
                            <p className={styles.titleDivider}>
                                Στοιχεία Πελάτη
                            </p>
                            <TextInput
                                control={form.control}
                                label={'Πελάτης'}
                                name="TNAME"
                                disabled={true}
                            />
                            <TextInput
                                control={form.control}
                                label={'Τηλέφωνο'}
                                name="TPHONE01"
                                disabled={true}
                            />
                            <TextInput
                                control={form.control}
                                label={'Περιοχή'}
                                name="TDISTRICT"
                                disabled={true}
                            />
                            <TextInput
                                control={form.control}
                                label={'Τ.Κ.'}
                                name="TZIP"
                                disabled={true}

                            />

                            {/* <div className="flex items-center space-x-2">
                                <Checkbox id="terms2" disabled  />
                                <label
                                    htmlFor="terms2"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Accept terms and conditions
                                </label>
                            </div> */}


                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button variant="outline"  >
                                    <X className="h-4 w-4" />
                                </Button >
                            </DialogClose>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault()
                                    router.push(`/dashboard/edit-event/${event.SOACTION}`)
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



