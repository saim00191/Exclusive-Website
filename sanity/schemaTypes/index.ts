import { type SchemaTypeDefinition } from 'sanity'
import { Products } from './Products'
import Order from './Order'
import CancelOrder from './OrderCancel'
import ReactivatedOrders from './ReactivatedOrders'
import Users from './Users'
import Inbox from './Inbox'
import Delivered from './Delivered'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Products,Order,CancelOrder,ReactivatedOrders,Users,Inbox,Delivered],
}
