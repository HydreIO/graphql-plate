import { makeExecutableSchema } from 'apollo-server-koa'
import resolvers from './resolvers'
import schemaDirectives from './directives'
import { mergeTypes } from 'merge-graphql-schemas'

import schema from './schema/schema.gql'

const dir = __dirname
export default makeExecutableSchema({
	typeDefs: mergeTypes([schema]),
	resolvers,
	schemaDirectives,
	resolverValidationOptions: { requireResolversForResolveType: false }
})
