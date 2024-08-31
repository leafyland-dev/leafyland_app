import React, { useState, useImperativeHandle, forwardRef } from "react";
import { z } from "zod";

// Define the Zod schema for form validation
const paymentFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z.string().min(1, "Address is required"),
  pinCode: z
    .string()
    .length(6, "Pin code must be 6 digits")
    .regex(/^\d+$/, "Pin code must contain only digits"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
});

type PaymentFormData = z.infer<typeof paymentFormSchema>;

interface PaymentFormProps {
  onFormChange: (data: PaymentFormData) => void;
}

const PaymentForm = forwardRef(({ onFormChange }: PaymentFormProps, ref) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    name: "",
    phone: "",
    address: "",
    pinCode: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PaymentFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    onFormChange(updatedFormData);
  };

  const validateForm = () => {
    const validationResult = paymentFormSchema.safeParse(formData);

    if (!validationResult.success) {
      const formErrors = validationResult.error.errors.reduce(
        (acc, error) => ({
          ...acc,
          [error.path[0]]: error.message,
        }),
        {}
      );
      setErrors(formErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  // Expose the validateForm function to the parent component
  useImperativeHandle(ref, () => ({
    validateForm,
  }));

  return (
    <section className="space-y-2 p-2 bg-white shadow-lg rounded-lg w-full">
      {/* Input fields with error handling */}
      {["name", "phone", "address", "pinCode", "city", "state"].map((field) => (
        <div key={field} className="flex flex-col">
          <label htmlFor={field} className="mb-2 font-semibold text-gray-700">
            {field.charAt(0).toUpperCase() + field.slice(1)}:
          </label>
          <input
            type="text"
            id={field}
            name={field}
            value={formData[field as keyof PaymentFormData]}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors[field as keyof PaymentFormData] && (
            <span className="text-red-500 text-sm">{errors[field as keyof PaymentFormData]}</span>
          )}
        </div>
      ))}
    </section>
  );
});

PaymentForm.displayName = "PaymentForm";

export default PaymentForm;
