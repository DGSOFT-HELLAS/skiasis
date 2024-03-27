"use client"
import styles from './styles.module.css'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


export function TimePicker({
    control,
    name,
    placeholder,
    label,
    disabled,
}) {
    return (
        <>
            <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <PopoverContent>
                    <FormField
                        control={control}
                        name={name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{label}</FormLabel>
                                <FormControl >
                                   
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </PopoverContent>
            </Popover>
        </>

    )
}
