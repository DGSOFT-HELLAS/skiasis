"use client"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


export function TextInput({
    control,
    name,
    placeholder,
    label,
    disabled
}) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                        className="disabled:opacity-60"
                        disabled={disabled}
                        placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage className="text-xs font-medium pt-1" />
                </FormItem>
            )}
        />
    )
}
