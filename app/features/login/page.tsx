"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({

    email: z.string().email({
        message: "Email must be valid.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    })
})

export default function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password:""
    },
  })

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false)
 
  const { formState } = form
 const router = useRouter();


  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (Object.keys(formState.errors).length > 0) {
        setShowAlert(true)
    } else {
        setShowAlert(false)
        setLoading(true) 
        console.log(values)
        
       
        try {
           
            await new Promise((resolve) => setTimeout(resolve, 3000))
            router.push('/features/dashboard')
        } catch (error) {
            console.error(error)
            setShowAlert(true)
        } finally {
            setLoading(false) 
        }
    }
}



  return(
    <div>
         <Form {...form}>
            <h1 className="text-center font-extrabold text-4xl mt-9 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Log In</h1>

                <div className="flex justify-center items-center min-h-screen">
                    
                    <div className="w-full max-w-md border border-gray-300 p-6 rounded-md">

                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                          
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

                           
                            <div className="flex justify-center">
                                <Button type="submit" onClick={()=> router.push("/features/dashboard")} 
                                disabled={loading} className="flex items-center pr-11 pl-11">
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
    </div>
  ) 
}
