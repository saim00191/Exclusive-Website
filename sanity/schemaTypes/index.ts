import { type SchemaTypeDefinition } from 'sanity'
import { Products } from './Products'
import Order from './Order'
import CancelOrder from './OrderCancel'
import ReactivatedOrders from './ReactivatedOrders'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Products,Order,CancelOrder,ReactivatedOrders],
}
