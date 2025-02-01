import { type SchemaTypeDefinition } from 'sanity'
import { Products } from './Products'
import Order from './Order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Products,Order],
}
