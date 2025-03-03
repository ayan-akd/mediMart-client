"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const formSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactComponent() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            message: "",
        },
    })

    function onSubmit() {
        toast.success("Message sent successfully!")
        form.reset()
    }

    const contactInfo = [
        {
            icon: <MdPhone className="w-6 h-6" />,
            title: "Phone",
            details: "+1 (234) 567-8900",
            action: "Call now"
        },
        {
            icon: <MdEmail className="w-6 h-6" />,
            title: "Email",
            details: "support@medimart.com",
            action: "Send email"
        },
        {
            icon: <MdLocationOn className="w-6 h-6" />,
            title: "Location",
            details: "123 Health Street, Medical City",
            action: "Get directions"
        },
        {
            icon: <MdAccessTime className="w-6 h-6" />,
            title: "Business Hours",
            details: "24/7 Service Available",
            action: "View hours"
        }
    ];

    return (
        <div className="min-h-screen py-16">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Have questions about our services? We&apos;re here to help 24/7.
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactInfo.map((info, index) => (
                        <motion.div
                            key={info.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full">
                                <CardContent className="p-6">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="text-[#E11D48] mb-4">
                                            {info.icon}
                                        </div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                            {info.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                                            {info.details}
                                        </p>
                                        <Button variant="link" className="text-[#E11D48]">
                                            {info.action}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Form Section */}
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                                Send us a Message
                            </h2>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="First Name..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Last Name..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter Your Email Here..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Message</FormLabel>
                                                <FormControl>
                                                    <Textarea 
                                                        placeholder="How can we help you?" 
                                                        className="min-h-[120px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button 
                                        type="submit"
                                        effect={"shine"}
                                        className="w-full bg-[#E11D48] hover:bg-rose-600 cursor-pointer"
                                    >
                                        Send Message
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
