import { ApolloServer, ApolloError, PubSub } from 'apollo-server-koa'
import schema from './graphql'

export const pubsub = new PubSub()
export const apollo = new ApolloServer({
  schema,
  context: () => ({
    user: { name: 'foo' },
    pubsub
  })
})


