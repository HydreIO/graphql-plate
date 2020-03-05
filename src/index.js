import Koa from "koa"
import cors from '@koa/cors'
import mergeSchema from "merge-graphql-schemas"
import { apollo } from './apollo'
import debug from 'debug'

const {
  PORT = 3000,
  ORIGINS = '*'
} = process.env

const log = debug('gql')
const { fileLoader, mergeTypes } = mergeSchema
const app = new Koa()

const parsed = body => { try { return JSON.parse(body) } catch { return body } }
const loggerMiddleware = async (ctx, next) => {
  await next()
  if (ctx.introspection) logResponse('Introspection result (hidden)')
  else logResponse.extend(ctx.status)('%o', parsed(ctx.body))
}

const corsOpt = {
  origin: ({ req: { headers: { origin } } }) => ORIGINS.split(';').reduce((a, b) => a || !!origin.match(b), '') && origin,
  credentials: true
}

void async function() {
  const app = new Koa().use(cors(corsOpt)).use(loggerMiddleware)
  const server = app.listen(PORT, () => log(`🚀 Now online! (:${PORT})`))
  apollo.applyMiddleware({ app, path: '/' })
  apollo.installSubscriptionHandlers(server)
}()
