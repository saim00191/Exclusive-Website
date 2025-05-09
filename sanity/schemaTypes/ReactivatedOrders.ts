import { Rule } from "sanity";

export default {
  name: "reactivateOrder",
  title: "Reactivated Orders",
  type: "document",
  fields: [
    {
      name: "orderId",
      title: "Order ID",
      type: "string",
      description: "A unique identifier for the order",
      validation: (Rule: Rule) => Rule.required().min(1).max(50),
      },
    
    {
      name: "userLoginName",
      title: "User Login Name",
      type: "string",
      description: "User Login Name",
    },
    {
      name: "userLoginEmail",
      title: "User Login Email",
      type: "string",
      description: "User Login Email",
    },
    {
      name: "userLoginPassword",
      title: "User Login Password",
      type: "string",
      description: "User Login Password",
    },
    {
      name: "firstName",
      title: "Buyer Name",
      type: "string",
      description: "Buyer Name",
    },
    {
      name: "company",
      title: "Company Name",
      type: "string",
      description: "Company Name",
    },
    {
      name: "address",
      title: "Full Address",
      type: "string",
      description: "Full Address",
    },
    {
      name: "city",
      title: "Town or city",
      type: "string",
      description: "Town or city",
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "number",
      description: "Phone Number",
    },
    {
      name: "email",
      title: "Email Address",
      type: "string",
      description: "Email Address",
    },
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "productId",
              title: "Product ID",
              type: "string",
              description: "The unique ID of the product",
              validation: (Rule: Rule) => Rule.required().min(1).max(50),
            },
            {
              name: "productImage",
              title: "Product Image",
              type: "image",
              description: "Product image",
            },
            {
              name: "productName",
              title: "Product Name",
              type: "string",
              description: "The name of the product",
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
              description: "The quantity of the product ordered",
              validation: (Rule: Rule) => Rule.required().min(1),
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              description: "Price of a single product",
              validation: (Rule: Rule) => Rule.required().min(0),
            },
            {
              name: "totalPrice",
              title: "Total Price",
              type: "number",
              description: "Total Amount of a single product",
              validation: (Rule: Rule) => Rule.required().min(0),
            },
          ],
        },
      ],
      description: "List of products in the order",
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
      description: "The total amount for the order",
      validation: (Rule: Rule) => Rule.required().min(0),
    },
    {
      name: "orderStatus",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      description: "The current status of the order",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Failed", value: "failed" },
        ],
        layout: "radio",
      },
      description: "The payment status of the order",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      description: "The date and time when the order was placed",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "shippingDate",
      title: "Shipping Date",
      type: "datetime",
      description: "The date and time when the order was shipped",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "reactivatedAt",
      title: "Reactivated Date",
      type: "datetime",
      description: "The date and time when the order was reactivated",
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};
