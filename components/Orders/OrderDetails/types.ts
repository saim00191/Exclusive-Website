export interface Product {
    _id?: string
    _key: string
    productId: string
    productImage: {
      _type: string
      asset: {
        _ref: string
      }
    }
    productName: string
    quantity: number
    price: number
    totalPrice: number
  }
  
export interface OrderData {
    _id: string
    orderId: string
    userLoginName: string
    userLoginEmail: string
    firstName: string
    company: string
    address: string
    city: string
    phone: string
    email: string
    products: Product[]
    totalAmount: number
    orderStatus: string
    paymentStatus: string
    orderDate: string
    shippingDate: string | null
}
  
export interface ImageType {
  asset: {
    _ref: string;
  };
}
