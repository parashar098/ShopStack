
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Phone, MapPin } from 'lucide-react';
import Map from "@/components/map";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // In a real application, you would send this data to a backend service
    console.log(data);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    form.reset();
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
              Have a question or feedback? We'd love to hear from you.
          </p>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Question about an order" {...field} />
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
                            <Textarea placeholder="Your message..." {...field} rows={5} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & Map */}
          <div className="md:col-span-3 space-y-8">
               <Card>
                  <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>Find us at the locations below or send us a message.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                      <div className="flex items-start gap-4">
                          <MapPin className="h-6 w-6 mt-1 text-primary shrink-0" />
                          <div>
                              <h4 className="font-semibold">Our Address</h4>
                              <p className="text-muted-foreground">123 Market St, San Francisco, CA 94103</p>
                          </div>
                      </div>
                       <div className="flex items-start gap-4">
                          <Phone className="h-6 w-6 mt-1 text-primary shrink-0" />
                          <div>
                              <h4 className="font-semibold">Call Us</h4>
                              <p className="text-muted-foreground">(123) 456-7890</p>
                          </div>
                      </div>
                       <div className="flex items-start gap-4">
                          <Mail className="h-6 w-6 mt-1 text-primary shrink-0" />
                          <div>
                              <h4 className="font-semibold">Email Us</h4>
                              <p className="text-muted-foreground">support@shopstack.com</p>
                          </div>
                      </div>
                  </CardContent>
              </Card>
              <div className="relative aspect-video rounded-lg overflow-hidden h-[400px]">
                  <Map />
              </div>
          </div>
      </div>
    </div>
  );
}
