import {Product} from './OrderDetails/types'

export interface Order {
    orderId: string
    firstName: string
    orderDate: string
    shippingDate: string
    products: Product[]
  }
  
  export interface UserInfo {
    email: string
  }
  
  