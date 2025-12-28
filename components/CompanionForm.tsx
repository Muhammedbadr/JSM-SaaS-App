"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import { subjects } from "@/constants"
import { redirect } from "next/navigation"
import { createCompanion } from "@/lib/actions/companion.actions"

// ------------------ ZOD SCHEMA ------------------
const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Companion name is required" }),

  subject: z
    .string()
    .min(1, { message: "Subject is required" }),

  topic: z
    .string()
    .min(1, { message: "Topic is required" }),

  voice: z
    .string()
    .min(1, { message: "Voice is required" }),

  style: z
    .string()
    .min(1, { message: "Style is required" }),

  duration: z
    .coerce
    .number()
    .min(1, { message: "Duration must be at least 1 minute" }),
})

// ------------------ COMPONENT ------------------
const CompanionForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const companion = await createCompanion(values); 

    if(companion){
      redirect(`/companions/${companion.id}`);
    }else{
      console.error("Failed to create companion");
      redirect('/companions/new');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion name</FormLabel>
              <FormControl>
                <Input placeholder="enter the companion name" {...field} className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SUBJECT */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="select the subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject} className="capitalize">
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TOPIC */}
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the companion help with?</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex: Derivatives & Integrals" {...field} className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* VOICE */}
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="input">
                    <SelectValue placeholder="select the voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="input">
                    <SelectValue placeholder="select the Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated session duration (minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="15"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SUBMIT */}
        <Button type="submit" className="w-full cursor-pointer">Build your companion</Button>

      </form>
    </Form>
  )
}

export default CompanionForm
