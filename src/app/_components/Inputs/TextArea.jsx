"use client"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Textarea as Input } from "@/components/ui/textarea"

export function TextArea({
    control,
    name,
    placeholder,
    label,
    disabled,
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
                        // rows={4}
                        resize={'vertical'}
                        disabled={disabled}
                        className="disabled:opacity-60" 
                        placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage className="text-xs font-medium pt-1" />
                </FormItem>
            )}
        />
    )
}
