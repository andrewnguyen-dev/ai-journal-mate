'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
import { submitMarkingAction } from "@/actions/conversation"

const formSchema = z.object({
  feedback: z.string().min(1),
  grade: z.coerce.number().min(0.1).max(5).step(0.1),
})

const MarkingForm = ( { conversationId, feedback, grade }: { conversationId: string, feedback: string | null, grade: number | null }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: feedback ?? "",
      grade: grade ?? 0,
    },
  })
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await submitMarkingAction(conversationId, values.feedback, values.grade);
      toast.success("Marking submitted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit marking!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Textarea placeholder="Your feedback about the diary" disabled={!!feedback} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <FormControl>
                <Input placeholder="Your grade" disabled={!!grade} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!!feedback && !!grade}>Submit</Button>
      </form>
    </Form>
  )
}

export default MarkingForm