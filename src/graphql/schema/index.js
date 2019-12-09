import { mergeTypes } from 'merge-graphql-schemas'
import schema from './schema.gql'

export default mergeTypes([schema])