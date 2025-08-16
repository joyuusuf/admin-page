"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, 
    
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, Loader2 } from "lucide-react"

const formSchema = z.object({
    firstname: z.string().min(3, {
        message: "First Name must have at least 3 characters.",
    }),
    othername: z.string().min(3, {
        message: "Other Name must have at least 3 characters.",
    }),
    lastname: z.string().min(3, {
        message: "Last Name must have at least 3 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export default function ProfileForm() {
    const [showAlert, setShowAlert] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
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

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setShowAlert(false)
        setLoading(true)
        console.log(values)

        try {
            await new Promise((resolve) => setTimeout(resolve, 3000))
            router.push('/features/login')
        } catch (error) {
            console.error(error)
            setShowAlert(true)
        } finally {
            setLoading(false)
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
                <h1 className="text-center font-extrabold text-4xl mt-9 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Sign Up
                </h1>

                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-full max-w-md border border-gray-300 p-6 rounded-md">
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            {/* First Name */}
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your first name"
                                                {...field}
                                                className={formState.errors.firstname
                                                    ? "border-red-500 focus-visible:ring-red-500"
                                                    : ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Other Name */}
                            <FormField
                                control={form.control}
                                name="othername"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Other Name:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your other name"
                                                {...field}
                                                className={formState.errors.othername
                                                    ? "border-red-500 focus-visible:ring-red-500"
                                                    : ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Last Name */}
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your last name"
                                                {...field}
                                                className={formState.errors.lastname
                                                    ? "border-red-500 focus-visible:ring-red-500"
                                                    : ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="myemail@gmail.com"
                                                {...field}
                                                className={formState.errors.email
                                                    ? "border-red-500 focus-visible:ring-red-500"
                                                    : ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password:</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                                className={formState.errors.password
                                                    ? "border-red-500 focus-visible:ring-red-500"
                                                    : ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit button */}
                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    disabled={loading || !formState.isValid}
                                    className="flex items-center pr-11 pl-11 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    {loading ? "Please wait" : "Submit"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Form>
        </>
    )
}





