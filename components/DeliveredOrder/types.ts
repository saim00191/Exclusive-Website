import { Product } from '@/components/Orders/OrderDetails/types'

export interface Order {
    orderId: string
    firstName: string
    orderDate: string
    shippingDate: string
  products: Product[]
  deliveryDate: string 
  }
  
  export interface UserInfo {
    email: string
  }
  
  