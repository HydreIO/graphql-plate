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
  context: ({ ctx }) => {
    logDate(new Date().toLocaleString())
    const { query = '' } = ctx.request.body
    ctx.introspection = !!query.includes('__schema')
    if (!ctx.introspection) logIncommingQuery(query)
    else logIncommingQuery('Introspection query (hidden)')
    return {
      pubsub
    }
  },
  formatError,
  playground: `${process.env.PLAYGROUND}`?.toLocaleLowerCase() === 'true'
})
