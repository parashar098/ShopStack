
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { placeOrder, createRazorpayOrder } from "@/actions/order";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Script from "next/script";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  address: z.string().min(5, "Address is too short."),
  city: z.string().min(2, "City is required."),
  zip: z.string().min(5, "A 5-digit ZIP code is required.").max(6),
  paymentMethod: z.enum(["stripe", "razorpay"], {
    required_error: "You need to select a payment method.",
  }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.paymentMethod === 'stripe') {
        if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "A 16-digit card number is required.",
                path: ["cardNumber"],
            });
        }
        if (!data.cardExpiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Expiry must be in MM/YY format.",
                path: ["cardExpiry"],
            });
        }
        if (!data.cardCvc || !/^\d{3}$/.test(data.cardCvc)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "A 3-digit CVC is required.",
                path: ["cardCvc"],
            });
        }
    }
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      address: "",
      city: "",
      zip: "",
      paymentMethod: "stripe",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  const handleFinalizeOrder = async (shippingData: CheckoutFormValues) => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Not Logged In",
            description: "You must be logged in to place an order.",
        });
        router.push('/login');
        return;
    }
    try {
      const orderId = await placeOrder({
        userId: user.id,
        shippingAddress: shippingData,
        items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price })),
        totalAmount: cartTotal,
      });

      if (orderId) {
        toast({
          title: "Order Placed!",
          description: "Thank you for your purchase.",
        });
        clearCart();
        router.push(`/order-confirmation/${orderId}`);
      } else {
        throw new Error("Failed to place order.");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "We couldn't process your order. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };


  const handleRazorpayPayment = async (formData: CheckoutFormValues) => {
    setIsProcessing(true);
    const result = await createRazorpayOrder(cartTotal);

    if (!result.success || !result.order) {
       toast({
        variant: "destructive",
        title: "Razorpay Error",
        description: result.error || "Could not initialize payment.",
      });
      setIsProcessing(false);
      return;
    }

    const razorpayOrder = result.order;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "ShopStack",
      description: "E-commerce Transaction",
      order_id: razorpayOrder.id,
      handler: async function (response: any) {
        await handleFinalizeOrder(formData);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
      },
      notes: {
        address: `${formData.address}, ${formData.city}, ${formData.zip}`,
      },
      theme: {
        color: "#6750A4", // Corresponds to --primary HSL
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
          toast({
            variant: "destructive",
            title: "Payment Cancelled",
            description: "You closed the payment window.",
          });
        }
      }
    };
    
    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', function (response: any){
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: response.error.description || "Your payment could not be processed.",
      });
      setIsProcessing(false);
    });

    rzp.open();
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    if (cartItems.length === 0) {
      toast({
        variant: "destructive",
        title: "Your cart is empty",
        description: "Please add items to your cart before checking out.",
      });
      return;
    }
    
    if (data.paymentMethod === 'razorpay') {
      await handleRazorpayPayment(data);
    } else {
      // Handle Stripe or other "credit card" payments here
      setIsProcessing(true);
      await handleFinalizeOrder(data);
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-headline font-bold tracking-tighter mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Shipping & Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Shipping Info */}
                    <h3 className="text-lg font-semibold border-b pb-2">Shipping Information</h3>
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
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Anytown" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="123456" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Payment Method */}
                    <h3 className="text-lg font-semibold border-b pb-2 pt-4">Payment Method</h3>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-md has-[[data-state=checked]]:border-primary">
                                <FormControl>
                                  <RadioGroupItem value="stripe" />
                                </FormControl>
                                <FormLabel className="font-normal flex-1 cursor-pointer">Credit Card (Mock)</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-md has-[[data-state=checked]]:border-primary">
                                <FormControl>
                                  <RadioGroupItem value="razorpay" />
                                </FormControl>
                                <FormLabel className="font-normal flex-1 cursor-pointer">Razorpay</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Conditional Credit Card Form */}
                    <AnimatePresence>
                      {paymentMethod === 'stripe' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="space-y-6 overflow-hidden"
                        >
                            <FormField
                              control={form.control}
                              name="cardNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Card Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="0000 0000 0000 0000" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="cardExpiry"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Expiry (MM/YY)</FormLabel>
                                      <FormControl>
                                        <Input placeholder="MM/YY" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="cardCvc"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>CVC</FormLabel>
                                      <FormControl>
                                        <Input placeholder="123" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                            </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button type="submit" size="lg" className="w-full mt-6" disabled={cartItems.length === 0 || isProcessing || !user}>
                      {isProcessing ? "Processing..." : `Place Order - ₹${cartTotal.toFixed(2)}`}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">{item.quantity} x</span>
                      <span>{item.name}</span>
                    </div>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
