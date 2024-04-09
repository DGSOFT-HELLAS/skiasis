"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock } from 'lucide-react';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from 'lucide-react';
import Link from "next/link"
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons"
import axios from 'axios'
import { signIn } from "next-auth/react";


const FormSchema = z.object({
    // email: z.string()
    //     .min(1, { message: "This field has to be filled." })
    //     .email("This is not a valid email."),
    username: z.string()
        .min(1, { message: "This field has to be filled." }),
    password: z.string()
        .min(3, { message: "Password must be at least 5 characters." })
})


export default function LoginForm() {
    const [state, setState] = useState({
        loading: false,
        disabled: false,
        user: null,
    });
    const [inputType, setInputType] = useState('password');
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })




    async function onSubmit(data) {
        setState(prev => ({ ...prev, loading: true, disabled: true }))
        try {
            const resp = await signIn('credentials', {
                username: data.username,
                password: data.password,
                redirect: false,
            })
          
            if (resp.status !== 200) {
                toast.error("Error Notification !");
                setState(prev => ({ ...prev, loading: false, disabled: false }))
                return;
            }
            router.push('/dashboard/calendar')
            setState(prev => ({ ...prev, loading: false, disabled: false }))

        }catch (e) {
            console.log(e)
        }

    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid gap-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormMessage className="form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="password_input">
                            <FormControl>
                                <Input type={inputType} placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage className="form_message" />
                            {inputType === 'password' ? (
                                <EyeOff onClick={() => setInputType('text')} className="password_icon" />
                            ) : (
                                <Eye className="password_icon" onClick={() => setInputType('password')} />
                            )}
                        </FormItem>
                    )}
                />
                {/* <div className="forgot_pass_container">
                    <CheckboxWithText label="keep me signed in" />
                    <span className=" text-sm">Forgot password?</span>
                </div> */}
                <Button  disabled={state.disabled}>
                    {state.loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Σύνδεση
                </Button>
                {/* <div className="go_back_link">
                    <Link href="/register">New here? Register now!</Link>
                </div> */}
            </form>
        </Form>

    )
}
