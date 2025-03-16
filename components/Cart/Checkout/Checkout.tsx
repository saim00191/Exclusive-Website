"use client";
import Wrapper from "@/shared/Wrapper";
import { Inter } from "next/font/google";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import BillingForm from "./Billing_Form";
import CartSummary from "./Cart_Summary";
import { useState } from "react";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export type FormData = {
  firstName: string;
  companyName: string;
  streetAddress: string;
  apartment: string;
  town: string;
  phone: string;
  email: string;
  saveInfo: boolean;
};

export type FormErrors = {
  [key in keyof FormData]?: string;
};

const BillingDetails = () => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    town: "",
    phone: "",
    email: "",
    saveInfo: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const products = useSelector((state: RootState) => state.products.products);
  const userInfo = useSelector((state: RootState) => state.products.userInfo);
  const router = useRouter();

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      setIsLoading(true);

      const productsWithImages = await Promise.all(
        products.map(async (product, index) => {
          let productImage;

          if (typeof product.img === "string") {
            const response = await fetch(product.img);
            const blob = await response.blob();
            const uploadedImage = await client.assets.upload("image", blob);
            productImage = {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: uploadedImage._id,
              },
            };
          } else if (product.img?.src) {
            const response = await fetch(product.img.src);
            const blob = await response.blob();
            const uploadedImage = await client.assets.upload("image", blob);
            productImage = {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: uploadedImage._id,
              },
            };
          } else {
            productImage = product.img;
          }

          return {
            productId: product.id,
            productImage,
            productName: product.title,
            quantity: product.quantity,
            price: product.price,
            totalPrice: product.price && product.price * product.quantity,
            _key: product.id ? `product-${product.id}` : `product-${index}`,
          };
        })
      );

      const orderId = `ORD-${Date.now()}`;
      const orderDate = new Date();

      const orderData = {
        _type: "order",
        orderId,
        userLoginName: userInfo?.displayName,
        userLoginEmail: userInfo?.email,
        userLoginPassword: userInfo?.password,
        firstName: formData.firstName,
        company: formData.companyName,
        address: formData.streetAddress,
        city: formData.town,
        phone: formData.phone,
        email: formData.email,
        products: productsWithImages,
        totalAmount: total,
        orderStatus: "pending",
        paymentStatus: "pending",
        orderDate: orderDate.toISOString(),
        deliveryDate: new Date(
          orderDate.getTime() + 8 * 24 * 60 * 60 * 1000
        ).toISOString(),
      };

      try {
        const result = await client.create(orderData);
        router.push("/orders/ordersuccess");

        setTimeout(async () => {
          try {
            const deliveredOrderData = {
              ...orderData,
              _type: "delivered",
              orderStatus: "delivered",
              paymentStatus: "paid",
            };

            const deliveredResult = await client.create(deliveredOrderData);

            if (deliveredResult) {
              await client.delete(result._id);
            }

            const reactivateOrder = await client.fetch(
              `*[_type == "reactivateOrder" && orderId == "${orderId}"][0]`
            );
            if (reactivateOrder) {
              await client.delete(reactivateOrder._id);
            }
          } catch (error) {
            console.error(
              "Error moving order to delivered schema or deleting:",
              error
            );
          }
        },8*24*60* 60 * 1000); 
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    const billingForm = [
      { title: "First Name", required: true, field: "firstName" },
      { title: "Company Name", required: false, field: "companyName" },
      { title: "Street Address", required: true, field: "streetAddress" },
      {
        title: "Apartment, floor, etc. (optional)",
        required: false,
        field: "apartment",
      },
      { title: "Town/City", required: true, field: "town" },
      { title: "Phone Number", required: true, field: "phone" },
      { title: "Email Address", required: true, field: "email" },
    ];

    billingForm.forEach((item) => {
      if (item.required && !formData[item.field as keyof FormData]) {
        errors[item.field as keyof FormData] = `${item.title} is required`;
      }
    });
    return errors;
  };

  if (products.length === 0) {
    return (
      <Wrapper className="py-12">
        <h2
          className={`${inter.className} text-[36px] tracking-[4px] leading-[30px] font-medium text-black`}
        >
          Your Cart is Empty
        </h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="py-12">
      <h2
        className={`${inter.className} text-[36px] tracking-[4px] px-4 xs:px-6 sm:px-8 leading-[30px] font-medium text-black`}
      >
        Billing Details
      </h2>
      <div className="flex flex-col lg:flex-row justify-between items-center py-10">
        <BillingForm
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
        <CartSummary
          products={products}
          total={total}
          setTotal={setTotal}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />
      </div>
    </Wrapper>
  );
};

export default BillingDetails;
