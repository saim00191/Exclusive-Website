import {Product} from './OrderDetails/types'

export interface Order {
    orderId: string
    firstName: string
    orderDate: string
    shippingDate: string
  products: Product[]
  cancelledAt: string 
  }
  
  export interface UserInfo {
    email: string
  }
  
  