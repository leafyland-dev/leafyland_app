"use client"
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { LoaderCircle } from "lucide-react";
import PaymentForm from "@/components/PaymentForm";
import { useState, useRef } from "react";

export default function Checkout() {
  const router = useRouter();
  const params = useSearchParams();
  const amount = params.get("amount");
  const productName = params.get("name")
  const [loading1, setLoading1] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const idRef = React.useRef();
  const paymentFormRef = useRef<any>(null);
  const [paymentFormData, setPaymentFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pinCode: "",
    city:"",
    state: "",
  });

  const createOrderId = React.useCallback(async () => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount!) * 100,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const id = data.orderId;
      idRef.current = id;
      setLoading1(false);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  }, [amount]);

  React.useEffect(() => {
    if (!amount) {
      router.replace("/");
    }
    createOrderId();
  }, [amount, createOrderId, router]);

  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form before proceeding
    const isFormValid = paymentFormRef.current?.validateForm();
    if (!isFormValid) {
      console.log("Form is not valid")
      return; // If the form is not valid, stop here
    }
    console.log("Form is valid")
    

    setLoading(true);
    const orderId = idRef.current;

    if(!orderId) {
      console.log('Order ID is not set');
      setLoading(false);
      return
    }

    try {
      const options = {
        key: process.env.key_id,
        amount: parseFloat(amount!) * 100,
        currency: "INR",
        name: "Payment", // business name
        description: "Payment",
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            ...paymentFormData, // Including the form data
            amount: parseFloat(amount!) * 100,
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          console.log("Payment data ",data);

          const result = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });

          const res = await result.json();
          
          if (res.isOk){
            // Save the order data to the database
          const saveOrderResult = await fetch("/api/saveOrder", {
            method: "POST",
            body: JSON.stringify({
              name: paymentFormData.name || "defaultName",
              phone: paymentFormData.phone,
              address: paymentFormData.address,
              pinCode: paymentFormData.pinCode,
              city: paymentFormData.city,
              state: paymentFormData.state,
              pricePaid: parseFloat(amount!) * 100,
              productName,
            }),
            headers: { "Content-Type": "application/json" },
          });
          const saveOrderRes = await saveOrderResult.json();
          if (saveOrderRes.success) {
            alert("Order placed successfully!");
          } else {
            alert("Failed to save order. Please contact support.");
          }
        } else {
          alert(res.message);
        }
           

        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      setLoading(false);
      paymentObject.open();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading1)
    return (
      <div className="container h-screen flex justify-center items-center">
        <LoaderCircle className="animate-spin h-20 w-20 text-primary" />
      </div>
    );

  return (
    <div className="container gap-100">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <section className=" flex flex-col justify-center items-center gap-10 w-full">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Checkout
        </h1>
        <Card className="max-w-[25rem] space-y-8">
          <CardHeader>
            <CardTitle className="my-4">Continue</CardTitle>
            <CardDescription>
              By clicking on pay you&apos;ll have a purchase of Rs {amount}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={processPayment}>
              <PaymentForm ref={paymentFormRef} onFormChange={setPaymentFormData} />
              <Button className="w-full" type="submit">
                {loading ? "...loading" : "Pay"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex">
            <p className="text-sm text-muted-foreground underline underline-offset-4">
              Please read the terms and conditions.
            </p>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
