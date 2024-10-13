"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

const formSchema = z.object({
    firstname: z.string().min(3, {
        message: "First Name field must be filled.",
    }),

    othername: z.string().min(3, {
        message: "Other Name field must be filled.",
    }),

    lastname: z.string().min(3, {
        message: "Last Name field must be filled.",
    }),

    email: z.string().email({
        message: "Email must be valid.",
    }),

    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export default function ProfileForm() {
    const [showAlert, setShowAlert] = useState(false)

   
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            othername: "",
            lastname: "",
            email: "",
            password: "",
        },
    })

    const { formState } = form
    const router = useRouter()

   
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (Object.keys(formState.errors).length > 0) {
            
            setShowAlert(true)
        } else {
            
            setShowAlert(false)
            console.log(values)
            
            router.push('/signup')
        }
    }

    return (
        <>
            {showAlert && (
                <Alert className="mb-4">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Hey!</AlertTitle>
                    <AlertDescription>
                        All fields must be filled correctly.
                    </AlertDescription>
                </Alert>
            )}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-8"
                >
                    <div className="flex justify-center">
                        <div className="w-full max-w-md border border-gray-300 p-4 rounded-md">
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="First Name" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="othername"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Other Name:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Other Name" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Last Name" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password:</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-center">
                        <Button type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
