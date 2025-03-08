export interface Product {
    productId: string
    productImage?: { asset: { _ref: string } }
    productName: string
    quantity: number
    price: number
    totalPrice: number
  }
  
  export interface Order {
    orderId: string
    firstName?: string
    userLoginEmail?: string
    userLoginPassword?: string
    phone?: string
    cancelledAt?: string
    email?: string
    city?: string
    company?: string
    address?: string
    products: Product[]
    totalAmount: number
    orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
    paymentStatus: "pending" | "paid" | "failed"
    orderDate: string
  }
  
  