import apolloKoa from 'apollo-server-koa'
import schema from './graphql'
import debug from 'debug'
import { formatError } from './graphql/errors'

const { ApolloServer, ApolloError, PubSub } = apolloKoa

const log = debug('gql')
const logIncommingQuery = log.extend('<-').extend('|')
const logDate = log.extend('time')

export const pubsub = new PubSub()
export const apollo = new ApolloServer({
  schema,
  // The context function can be called for:
  // a graphql http koa query with parameters:
  //  { ctx } where ctx is a Koa Context
  // a graphql websocket subcription with paramters:
  //  { connection, payload }
  context({ ctx, connection }) {
    logDate(new Date().toLocaleString())
    const { query = '' } = connection || ctx.request.body

    const introspection = !!query.includes('__schema')

    if (!introspection) logIncommingQuery(query)
    else logIncommingQuery('Introspection query (hidden)')

    if (ctx) ctx.introspection = introspection
    return {
      pubsub
    }
  },
  formatError,
  playground: `${process.env.PLAYGROUND}`?.toLocaleLowerCase() === 'true'
})
