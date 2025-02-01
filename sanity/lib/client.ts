import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:'sk1KKRMjChz0AKjBlanjL6DgfpU142Lly2CFMIS4G9aca1UYvTUEqisoyda0wHMgcJmIzmblc7GJI1xJdSGdBeukxB36d8p93w70NVFCBjBNffxKalreUpKqAW41WP7bQoHUnY7Z8yB6cEDAFW8y3Dr5hbaG4md9AUBpNZ6ui2BM7CXNB5gm'
})
