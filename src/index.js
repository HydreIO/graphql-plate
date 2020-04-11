import Koa from "koa"
import cors from '@koa/cors'
import mergeSchema from "merge-graphql-schemas"
import { apollo } from './apollo'
import debug from 'debug'

const {
  PORT = 3000,
  ORIGINS = '.*',
  GRAPHQL_PATH = '/v1',
} = process.env

const log = debug('gql')
const logResponse = log.extend('->')

const { fileLoader, mergeTypes } = mergeSchema
const app = new Koa()

const parsed = body => { try { return JSON.parse(body) } catch { return body } }
const loggerMiddleware = async (ctx, next) => {
  await next()
  if (ctx.introspection) logResponse('Introspection result (hidden)')
  else logResponse.extend(ctx.status)('%o', parsed(ctx.body))
}

const corsOpt = {
  origin({ req: { headers: { origin } } }) {
    if (ORIGINS.split(';').some(a => origin.match(a))) return origin
    else return false
  },
  credentials: true
}

void async function() {
  const app = new Koa().use(cors(corsOpt)).use(loggerMiddleware)
  const server = app.listen(+PORT, () => log(`🚀 Now online! (0.0.0.0:${+PORT}${GRAPHQL_PATH})`))
  apollo.applyMiddleware({ app, path: GRAPHQL_PATH })
  apollo.installSubscriptionHandlers(server)
}()
